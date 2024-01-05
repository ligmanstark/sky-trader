//@ts-nocheck
import { FC, useRef, MutableRefObject, useState } from 'react';
import { useModal } from '../../../hooks/useModal';
import { Close } from '../../../assets/img/index';
import { InputField } from '../../form/InputField';
import { Input } from '../../form/Input';
import { Button } from '../../form/Button';
import { UploadImage } from '../../form/UploadImage';
import * as S from './style';
import {
	useUpdateADSMutation,
	useSetRefreshTokenMutation,
	useLazyGetAllGoodsQuery,
	useUpdatePicturiesMutation,
	useDeletePicturiesMutation,
} from '../../../store/service/goodsService';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import {
	AddGoods,
	setCurrentStateDate,
} from '../../../store/slices/goodsSlice';
import { setAccessToken } from '../../../store/slices/userSlice';

export const ModalUpdatePost: FC = () => {
	const [localID, setLocalID] = useState(Number);
	const data = useSelector(
		(state: RootState) => state.goodsReducer.currentState
	);
	const IdState = useSelector(
		(state: RootState) => state.goodsReducer.idCurrentState
	);
	const [deletePic] = useDeletePicturiesMutation();

	//@ts-ignore
	const [name, setName] = useState(data.title);
	//@ts-ignore
	const [description, setDescription] = useState(data.description);
	//@ts-ignore
	const [price, setPrice] = useState(data.price);
	const dispatch = useDispatch();
	const token = useSelector(
		(state: RootState) => state.userReducer.access_token
	);
	const refresh = useSelector(
		(state: RootState) => state.userReducer.refresh_token
	);
	const [updateADS] = useUpdateADSMutation();
	const [updateStore] = useLazyGetAllGoodsQuery();
	const [putRefreshToken] = useSetRefreshTokenMutation();
	const nameValueRef = useRef<HTMLInputElement>(null);
	const descriptionValueRef =
		useRef() as MutableRefObject<HTMLTextAreaElement>;
	const priceValueRef = useRef<HTMLInputElement>(null);

	const { close } = useModal('change-post');
	const [pic] = useUpdatePicturiesMutation();

	const handlePost = (e: any) => {
		if (nameValueRef.current?.value && priceValueRef.current?.value) {
			updateADS({
				body: {
					title: nameValueRef.current?.value as string,
					description: descriptionValueRef.current.value as string,
					price: Number(priceValueRef.current?.value) as number,
				},
				accessToken: token as string,
				id: IdState,
			})
				.unwrap()
				.then((res) => {
					dispatch(setCurrentStateDate(res));
					setLocalID(res.id as number);
					updateStore();
				})
				.catch((error) => {
					if (error.status === 401) {
						putRefreshToken({
							access_token: token as string,
							refresh_token: refresh as string,
						})
							.unwrap()
							.then((newRes) => {
								console.log('token upload');
								dispatch(setAccessToken(newRes));
								localStorage.setItem('token', newRes.access_token);
								updateADS({
									body: {
										title: nameValueRef.current?.value as string,
										description: descriptionValueRef.current
											?.value as string,
										price: Number(
											priceValueRef.current?.value
										) as number,
									},
									accessToken: token as string,
									id: IdState,
								})
									.unwrap()
									.then((res) => {
										updateStore();

										close();
									});
							});
					}
				});
		} else {
			alert('Заполните все поля!');
		}
		close();
	};

	const handleClose = () => {
		close();
	};

	const handleUpdate = async (file: File | null) => {
		const files = file;
		await pic({ accessToken: token as string, id: IdState, credent: files })
			.unwrap()
			.then((res) => {
				dispatch(AddGoods(res));
				console.log(res);
			});
	};

	const handleDelete = async (file: any) => {
		await deletePic({ accessToken: token as string, id: IdState, file_url: file })
			.unwrap()
			.then((res) => updateStore());
	};
console.log(data);
	return (
		<S.Wrapper>
			<S.Box>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						gap: '10rem',
						alignItems: 'center',
						fontSize: '2rem',
						marginBottom: '2rem',
					}}
				>
					<h1>Редактировать объявление</h1>
					<div onClick={handleClose} style={{ cursor: 'pointer' }}>
						<Close />
					</div>
				</div>
				<S.SubBox>
					<S.TitleBox>
						<S.TitleH2>Название</S.TitleH2>
						<InputField>
							<Input
								type="text"
								placeholder="Введите название"
								required
								ref={nameValueRef}
								onChange={(e) => setName(e.target.value)}
								value={name}
							/>
						</InputField>
					</S.TitleBox>
					<S.DescriptionBox>
						<S.TitleH2>Описание</S.TitleH2>
						<InputField>
							<S.TextArea
								placeholder="Введите описание"
								required
								ref={descriptionValueRef}
								onChange={(e) => setDescription(e.target.value)}
								value={description}
							/>
						</InputField>
					</S.DescriptionBox>
					<S.PhotoBox>
						<div
							style={{
								display: 'flex',
								gap: '1rem',
								marginBottom: '0.5rem',
							}}
						>
							<S.TitleH2>Фотографии товара</S.TitleH2>
							<S.TextGrey>не более 5 фотографий</S.TextGrey>
						</div>
						<S.PhotoContent>
							<>
								{data.images[0] ? (
									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() =>
											handleDelete(data.images[0].url)
										}
										src={data.images[0].url}
									/>
								) : (
									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() => handleDelete()}
									/>
								)}
							</>

							<>
								{data.images[1] ? (
									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() =>
											handleDelete(data.images[1].url)
										}
										src={data.images[1].url}
									/>
								) : (
									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() => handleDelete()}
									/>
								)}
							</>

							<>
								{data.images[2] ? (
									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() =>
											handleDelete(data.images[2].url)
										}
										src={data.images[2].url}
									/>
								) : (
									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() => handleDelete()}
									/>
								)}
							</>

							<>
								{data.images[3] ? (
									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() =>
											handleDelete(data.images[3].url)
										}
										src={data.images[3].url}
									/>
								) : (
									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() => handleDelete()}
									/>
								)}
							</>

							<>
								{data.images[4] ? (
									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() =>
											handleDelete(data.images[4].url)
										}
										src={data.images[4].url}
									/>
								) : (
									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() => handleDelete()}
									/>
								)}
							</>
						</S.PhotoContent>
					</S.PhotoBox>
					<S.PriceBox>
						<S.TitleH2 style={{ marginTop: '0.5rem' }}>Цена</S.TitleH2>
						<InputField>
							<S.AfterBox>
								<Input
									inputMode="decimal"
									type="number"
									pattern="[0-9]*[.]?[0-9]+"
									placeholder="0"
									ref={priceValueRef}
									style={{ border: 'none', outline: 'none' }}
									onChange={(e) => setPrice(Number(e.target.value))}
									value={price}
								></Input>
								<label>₽</label>
							</S.AfterBox>
						</InputField>
						<>
							<Button
								style={{
									marginTop: '1rem',
									background: name === '' ? 'grey' : '',
								}}
								$border
								type="submit"
								onClick={handlePost}
							>
								Редактировать
							</Button>
						</>
					</S.PriceBox>
				</S.SubBox>
			</S.Box>
		</S.Wrapper>
	);
};

import { FC, useRef, MutableRefObject, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from '../../../hooks/useModal';
import { Close } from '../../../assets/img/index';
import { InputField } from '../../form/InputField';
import { Input } from '../../form/Input';
import { Button } from '../../form/Button';
import * as S from './style';
import {
	usePostAdsWithoutImgMutation,
	useLazyGetAllGoodsQuery,
	useSetRefreshTokenMutation,
	useUpdatePicturiesMutation,
	useDeletePicturiesMutation,
} from '../../../store/service/goodsService';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { AddGoods,setImg } from '../../../store/slices/goodsSlice';
import { setAccessToken } from '../../../store/slices/userSlice';
import { UploadImage } from '../../form/UploadImage';

export const ModalPost: FC = () => {
	const [updateADS]=useLazyGetAllGoodsQuery()
	const router = useRouter();
	const [currentID,setCurrebtID]=useState(String)
	const [isImg, setIsImg] = useState(false);
	const [name, setName] = useState('');
	const dispatch = useDispatch();
	const token = useSelector(
		(state: RootState) => state.userReducer.access_token
	);
	const refresh = useSelector(
		(state: RootState) => state.userReducer.refresh_token
	);
	const [postADS] = usePostAdsWithoutImgMutation();

	const [putRefreshToken] = useSetRefreshTokenMutation();

	const [pic] = useUpdatePicturiesMutation();

	const [deletePic] = useDeletePicturiesMutation();
	const nameValueRef = useRef<HTMLInputElement>(null);
	const descriptionValueRef =
		useRef() as MutableRefObject<HTMLTextAreaElement>;
	const priceValueRef = useRef<HTMLInputElement>(null);
	const { close } = useModal('post');

	const [localID, setLocalID] = useState(Number);
const currImg = useSelector((state:RootState)=>state.goodsReducer.imageState)
	const handlePost = (e: any) => {
		if (nameValueRef.current?.value && priceValueRef.current?.value) {
			postADS({
				body: {
					title: nameValueRef.current?.value as string,
					description: descriptionValueRef.current.value as string,
					price: Number(priceValueRef.current?.value) as number,
				},
				accessToken: token as string,
			})
				.unwrap()
				.then((res) => {
					setIsImg((prev)=>!prev)
					dispatch(AddGoods(res));
					setCurrebtID(res.id as string)
					setLocalID(res.id as number)
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
								postADS({
									body: {
										title: nameValueRef.current?.value as string,
										description: descriptionValueRef.current
											.value as string,
										price: Number(
											priceValueRef.current?.value
										) as number,
									},
									accessToken: token as string,
								})
									.unwrap()
									.then((res) => {
										dispatch(AddGoods(res));
										close();
									});
							});
					}
				});
		} else {
			alert('Заполните все поля!');
		}
	};

	const handleClose = () => {
		close();
	};

	const handleUpdate = async (file: File | null) => {
		const files = file;
		await pic({ accessToken: token as string, id: localID, credent: files })
			.unwrap().then((res)=>dispatch(setImg(res)))
 	};

	const handleDelete = async (file: any) => {
		await deletePic({ accessToken: token as string, id: localID, file_url: file })
			.unwrap()
			.then((res) => dispatch(setImg(res)));
	};

	const handleCloseModal = () => {
		router.push('http://localhost:3000/goods/' + currentID, { scroll: false })
		close()
		updateADS()
	};

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
					<h1>Новое объявление</h1>
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
							/>
						</InputField>
					</S.DescriptionBox>
					{isImg ? (
						<>
							{' '}
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
									
 									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() => handleDelete(currImg[0]?.images[0].url)}
									/>
									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() => handleDelete(currImg[1].images[0].url)}
									/>
									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() => handleDelete(currImg[2].images[0].url)}
									/>
									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() => handleDelete(currImg[3].images[0].url)}
									/>
									<UploadImage
										getFile={(file) => handleUpdate(file)}
										deleteFile={() => handleDelete(currImg[4].images[0].url)}
									/>
								</S.PhotoContent>
							</S.PhotoBox>
						</>
					) : (
						''
					)}

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
								></Input>
								<label>₽</label>
							</S.AfterBox>
						</InputField>
						{!isImg ? (
							<>
								<Button
									style={{
										marginTop: '1rem',
										background: name === '' ? 'grey' : '',
									}}
									$border
									onClick={handlePost}
								>
									Опубликовать
								</Button>
							</>
						) : (
							<>
								<Button
									style={{
										marginTop: '1rem',
										background: name === '' ? 'grey' : '',
									}}
									$border
									onClick={handleCloseModal}
								>
									Добавить фото
								</Button>
							</>
						)}
					</S.PriceBox>
				</S.SubBox>
			</S.Box>
		</S.Wrapper>
	);
};

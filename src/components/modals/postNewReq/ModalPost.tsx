import { FC, useRef, MutableRefObject, useState } from 'react';
import React, { forwardRef } from 'react';

import { useModal } from '../../../hooks/useModal';
import { Close } from '../../../assets/img/index';
import { InputField } from '../../form/InputField';
import { Input } from '../../form/Input';
import { Button } from '../../form/Button';
import { ItemPhotos } from './ItemPhotos';
import * as S from './style';
import {
	usePostAdsWithoutImgMutation,
	usePostAdsWithImgMutation,
	useSetRefreshTokenMutation,
	// useUpdatePicturiesMutation,
} from '../../../store/service/goodsService';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { AddGoods } from '../../../store/slices/goodsSlice';
import { setAccessToken } from '../../../store/slices/userSlice';

export const ModalPost: FC = () => {
	const [name, setName] = useState('');
	const dispatch = useDispatch();
	const token = useSelector(
		(state: RootState) => state.userReducer.access_token
	);
	const refresh = useSelector(
		(state: RootState) => state.userReducer.refresh_token
	);
	const [postADS] = usePostAdsWithoutImgMutation();
	const [postADSWithImg] = usePostAdsWithImgMutation();

	const [putRefreshToken] = useSetRefreshTokenMutation();

	// const [pic] = useUpdatePicturiesMutation();
	const nameValueRef = useRef<HTMLInputElement>(null);
	const descriptionValueRef =
		useRef() as MutableRefObject<HTMLTextAreaElement>;
	const priceValueRef = useRef<HTMLInputElement>(null);
	const imageRef = useRef<HTMLInputElement | null>(null);

	const { close } = useModal('post');

	const initialImgFiles: Array<File | null> = Array.from(
		{ length: 5 },
		() => null
	);
	const [imgFiles, setImgFiles] = useState(initialImgFiles);

	const handlePost = () => {
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
					dispatch(AddGoods(res));
					close();
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

	const handleImg = (e: any, index: any) => {
		const files = e.target.files ? e.target.files[0] : null;

		if (files) {
			const reader = new FileReader();
			reader.onload = () => {
				setImgFiles((prevImgFiles) =>
					prevImgFiles.map((imgFile, i) => (i === index ? files : imgFile))
				);
			};
			reader.readAsDataURL(files);
			postADSWithImg({
				accessToken: token as string,
				imgFiles: files,
				fields: {
					title: nameValueRef.current?.value as string,
					description: descriptionValueRef.current.value as string,
					price: Number(priceValueRef.current?.value) as number,
				},
			})
				.unwrap()
				.then((res) => {
					console.log(res);
				});
			// pic({
			// 	accessToken: token as string,
			// 	credent: files,
			// 	data: {
			// 		title: nameValueRef.current?.value as string,
			// 		description: descriptionValueRef.current.value as string,
			// 		price: Number(priceValueRef.current?.value) as number,
			// 	},
			// }).unwrap();
		}
	};

	// const handleImg = (event: any) => {
	// 	const files = event.target.files ? event.target.files[0] : null;
	// 	console.log(event.target.files[0]);
	// 	if (files) {
	// 		const reader = new FileReader();
	// 		reader.readAsDataURL(files);
	// 		console.log(reader.readAsDataURL(files));
	// 		postADSWithImg({
	// 			accessToken: token as string,
	// 			body: {
	// 				fields: {
	// 					title: nameValueRef.current?.value as string,
	// 					description: descriptionValueRef.current.value as string,
	// 					price: Number(priceValueRef.current?.value) as number,
	// 				},
	// 				credent: files,
	// 			},
	// 		}).unwrap();
	// 		return;
	// 	}
	// };
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
							{/* <S.Images>
								<label id="name">
									<ItemPhotos />
									<input
										name="Photo"
										id="name"
										type="file"
										style={{ display: 'none' }}
										ref={imageRef}
										// onChange={(event) => handleImg(event)}
									/>
								</label>
							</S.Images> */}
							{imgFiles.map((imgFile, index) => (
								<label id="name" key={index}>
									<ItemPhotos />
									<input
										name="Photo"
										id="name"
										type="file"
										style={{ display: 'none', cursor: 'pointer' }}
										key={index}
										accept="image/*"
										onChange={(e) => handleImg(e, index)}
										// onChange={(e) => handleImg(e, index)}
									/>
								</label>
							))}
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
								Опубликовать
							</Button>
						</>
					</S.PriceBox>
				</S.SubBox>
			</S.Box>
		</S.Wrapper>
	);
};

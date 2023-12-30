'use client'
import { FC, useState, useRef } from 'react';
import  Link  from 'next/link';
import * as S from './style';
import { BASE_URL } from '../../../utils/consts';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { Button, NoButton } from '../../form/Button';
import { NothingImage } from '../../../assets/img/index';
import { InputPlaceBlack } from '../../form/Input';
import { InputField } from '../../form/InputField';
import { ModalControl } from '../../modals/ModalControl';
// import { ModalUploadAvatar } from '../../modals/uploadAvatar/ModalUploadAvatar';
import { ModalUploadAvatar2  } from '../../modals/uploadAvatar/ModalUploadAvatar';

import {
	useUpdateUserMutation,
	useSetRefreshTokenMutation,
} from '../../../store/service/goodsService';
import { setUser, setAccessToken } from '../../../store/slices/userSlice';
export const YourSellerInfo: FC = () => {
	const dispatch = useDispatch();
	const [updateDateUSer] = useUpdateUserMutation();
	const [putRefreshToken] = useSetRefreshTokenMutation();
	const token = useSelector(
		(state: RootState) => state.userReducer.access_token
	);
	const name = useSelector((state: RootState) => state.userReducer.name);
	const city = useSelector((state: RootState) => state.userReducer.city);
	const phone = useSelector((state: RootState) => state.userReducer.phone);
	const surname = useSelector((state: RootState) => state.userReducer.surname);
	const avatar = useSelector((state: RootState) => state.userReducer.avatar);

	const [currName, setCurrName] = useState<string>(name);
	const [currSurname, setCurrSurname] = useState<string>(surname);
	const [currPhone, setCurrPhone] = useState<string>(phone);
	const [currCity, setCurrCity] = useState<string>(city);

	const accessToken = useSelector(
		(state: RootState) => state.userReducer.access_token
	);
	const refreshToken = useSelector(
		(state: RootState) => state.userReducer.refresh_token
	);

	const nameContoll = useRef<HTMLInputElement | null>(null);
	const surnameContoll = useRef<HTMLInputElement | null>(null);
	const cityControll = useRef<HTMLInputElement | null>(null);
	const phoneControll = useRef<HTMLInputElement | null>(null);

	const handleUpdate = () => {
		if (
			nameContoll.current?.value.length ||
			surnameContoll.current?.value.length ||
			cityControll.current?.value.length ||
			phoneControll.current?.value.length
		) {
			updateDateUSer({
				body: {
					city: cityControll.current?.value,
					name: nameContoll.current?.value,
					surname: surnameContoll.current?.value,
					phone: phoneControll.current?.value,
				},
				accessToken: token as string,
			})
				.unwrap()
				.then((user) => {
					console.log(user);
					dispatch(
						setUser({
							email: user.email,
							name: user.name,
							surname: user.surname,
							city: user.city,
							phone: user.phone,
							id: user.id,
						})
					);
				})
				.catch((error) => {
					if (error.status === 401) {
						putRefreshToken({
							access_token: accessToken as string,
							refresh_token: refreshToken as string,
						})
							.unwrap()
							.then((newToken) => {
								console.log('token upload');
								dispatch(setAccessToken(newToken));
								localStorage.setItem('token', newToken.access_token);
								updateDateUSer({
									body: {
										city: cityControll.current?.value,
										name: nameContoll.current?.value,
										surname: surnameContoll.current?.value,
										phone: phoneControll.current?.value,
									},
									accessToken: token as string,
								})
									.unwrap()
									.then((user) => {
										console.log(user);
										dispatch(
											setUser({
												email: user.email,
												name: user.name,
												surname: user.surname,
												city: user.city,
												phone: user.phone,
												id: user.id,
											})
										);
									});
							})
							.catch(() => {
								<Link href="/login"></Link>;
							});
					}
				});
		}
	};
	console.log(avatar);
	return (
		<S.Wrapper>
			<S.Box>
				<S.H1Ad>{`Привет! ${name}`}</S.H1Ad>
				<S.H4Ad>Настройки профиля</S.H4Ad>
				<S.SubBox>
					<S.SubBoxAvatar>
						{avatar ? (
							<S.Img src={`${BASE_URL}/${avatar}`} />
						) : (
							<NothingImage />
						)}
						<ModalControl id="uploadAvatar" modal={<ModalUploadAvatar2 />}>
							<p style={{ color: '#009ee4' }}>Заменить</p>
						</ModalControl>
					</S.SubBoxAvatar>
					<S.SubBoxInfo>
						<div>
							<InputField>
								<S.Info1>
									<div>
										<S.SellerName>Имя</S.SellerName>
										<InputPlaceBlack
											type="text"
											value={currName}
											ref={nameContoll}
											onChange={(e) => setCurrName(e.target.value)}
										></InputPlaceBlack>
									</div>
									<div>
										<S.SellerName>Фамилия</S.SellerName>
										<InputPlaceBlack
											type="text"
											value={currSurname}
											ref={surnameContoll}
											onChange={(e) =>
												setCurrSurname(e.target.value)
											}
										></InputPlaceBlack>
									</div>
								</S.Info1>
								<S.Info2>
									<div style={{ maxWidth: '14.8rem' }}>
										<S.SellerName>Город</S.SellerName>
										<InputPlaceBlack
											type="text"
											value={currCity}
											ref={cityControll}
											onChange={(e) => setCurrCity(e.target.value)}
										></InputPlaceBlack>
									</div>
									<div>
										<S.SellerName>Телефон</S.SellerName>
										<InputPlaceBlack
											type="number"
											value={currPhone}
											ref={phoneControll}
											onChange={(e) => setCurrPhone(e.target.value)}
										></InputPlaceBlack>
									</div>
								</S.Info2>
								{nameContoll.current?.value ||
								surnameContoll.current?.value ||
								cityControll.current?.value ||
								phoneControll.current?.value ? (
									<Button
										style={{ marginTop: '1rem' }}
										$border
										type="submit"
										onClick={handleUpdate}
									>
										Сохранить
									</Button>
								) : (
									<NoButton
										style={{ marginTop: '1rem' }}
										$border
										type="submit"
										onClick={handleUpdate}
									>
										Сохранить
									</NoButton>
								)}
								{/* <Button
										style={{ marginTop: '1rem' }}
										$border
										type="submit"
										onClick={handleUpdate}
									>
										Сохранить
									</Button> */}
							</InputField>
						</div>
					</S.SubBoxInfo>
				</S.SubBox>
			</S.Box>
		</S.Wrapper>
	);
};

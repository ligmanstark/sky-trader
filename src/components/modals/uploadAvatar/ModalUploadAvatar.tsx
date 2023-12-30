import { FC, useRef } from 'react';
import  Link  from 'next/link';
import * as S from './style';
import { InputField } from '../../form/InputField';
import { Input } from '../../form/Input';
import { Button } from '../../form/Button';
import { Close } from '../../../assets/img';
import { useModal } from '../../../hooks/useModal';
import {
	useUpdateUserAvatarMutation,
	useSetRefreshTokenMutation,
} from '../../../store/service/goodsService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setAccessToken } from '../../../store/slices/userSlice';
export const ModalUploadAvatar: FC = () => {
	const avatarRef = useRef<HTMLInputElement | null>(null);
	const dispatch = useDispatch();
	const token = useSelector(
		(state: RootState) => state.userReducer.access_token
	);
	const accessToken = useSelector(
		(state: RootState) => state.userReducer.access_token
	);
	const refreshToken = useSelector(
		(state: RootState) => state.userReducer.refresh_token
	);

	const { close } = useModal('uploadAvatar');
	const [updateAvatar] = useUpdateUserAvatarMutation();
	const [putRefreshToken] = useSetRefreshTokenMutation();
	const handleUpload = (event: any) => {
		const files = event.target.files[0];
		console.log(event.target.files);
		// const formdata = new FormData();
		// formdata.append('myAvatar', files[0]);

		const reader = new FileReader();
		reader.readAsDataURL(files);
console.log(reader);
		updateAvatar({
			accessToken: token as string,
			credent: files,
		})
			.unwrap()
			.then((response) => {
				console.log(response);
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
						})
						.catch(() => {
							<Link href="/login"></Link>;
						});
				}
			});
	};
	return (
		<S.Wrapper>
			<S.Box>
				<InputField>
					<div style={{ display: 'flex', gap: '2rem' }}>
						<Input
							type="file"
							ref={avatarRef}
							accept="image/*"
							onChange={(event) => handleUpload(event)}
						></Input>
						<S.ButtonClose
							style={{ cursor: 'pointer' }}
							onClick={() => close()}
						>
							<Close />
						</S.ButtonClose>
					</div>
					<S.Buttons>
						<Button $color $border onClick={handleUpload}>
							Отправить
						</Button>
					</S.Buttons>
				</InputField>
			</S.Box>
		</S.Wrapper>
	);
};

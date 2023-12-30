'use client';
import { FC } from 'react';
import { setCookie } from 'cookies-next';
import { InputField } from '../../components/form/InputField';
import { Input } from '../../components/form/Input';
import { Button } from '../../components/form/Button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import styled from '@emotion/styled';
import { LogoPic } from '../../assets/img/index';
import { MAIN_ROUTE } from '../../utils/consts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setUser, setAccessToken } from '../../store/slices/userSlice';
import {
	useSetLoginUserMutation,
	useLazyGetUserQuery,
} from '../../store/service/goodsService';

type TSignUp = {
	email: string;
	password: string;
	repeat: string;
	name: string;
	surname?: string;
	city?: string;
};

const LoginPage = () => {
	if (typeof window !== 'undefined') return <Login />;
};

const Login: FC = () => {
	const [postToken] = useSetLoginUserMutation();
	const [postLogin] = useLazyGetUserQuery();
	const dispatch = useDispatch();
	const router = useRouter();
	const getToken = useSelector(
		(state: RootState) => state.userReducer.access_token
	);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TSignUp>();

	const onSubmit = async (data: TSignUp) => {
		await postToken({
			body: {
				email: data.email,
				password: data.password,
			},
		})
			.unwrap()
			.then((token: any) => {
				dispatch(
					setAccessToken({
						access_token: token.access_token,
						refresh_token: token.refresh_token,
						token_type: token.token_type,
					})
				);

				postLogin({ accessToken: token.access_token })
					.unwrap()
					.then((login) => {
						dispatch(
							setUser({
								email: login.email,
								name: login.name,
								surname: login.surname,
								city: login.city,
								phone: login.phone,
								id: login.id,
							})
						);
						setCookie('loggged','true')
					});
			});

		setTimeout(() => {
			localStorage.setItem('token', getToken as string);

			router.push(MAIN_ROUTE, { scroll: false });
		}, 1500);
	};

	return (
		<Wrapper>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Logo>
					<LogoPic />
				</Logo>
				<InputField error={errors.email?.message}>
					<Input
						{...register('email', {
							required: 'Почта обязательна',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Некорректный адрес электронной почты',
							},
						})}
						placeholder="Email"
					/>
				</InputField>
				<InputField error={errors.password?.message}>
					<Input
						type="password"
						{...register('password', {
							required: 'Пароль обязательна',
							minLength: {
								value: 6,
								message: 'Пароль должен содержать минимум 7 символов',
							},
							maxLength: {
								value: 20,
								message: 'Максимальная длина пороля 20 символов',
							},
							pattern: {
								value: /(?=.*[0-9])/,
								message: 'Пароль должен содержать хотя бы одну цифру',
							},
						})}
						placeholder="Password"
					/>
				</InputField>

				<Buttons>
					<Button type="submit" $color>
						Войти
					</Button>
					<Link href={'/register'}>
						<Button type="submit">Регистрация</Button>
					</Link>
				</Buttons>
			</Form>
		</Wrapper>
	);
};

const Form = styled.form`
	display: flex;
	gap: 1rem;
	flex-direction: column;
	align-items: center;
	border-radius: 0.75rem;
	background: #fff;
	padding: 2rem 2.6rem 3rem;
	width: 22.875rem;
	box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
	html {
		background-color: #f5f5f5;
	}
`;
const Buttons = styled.div`
	display: grid;
	gap: 1.25rem;
	margin-top: 1rem;
`;

const Logo = styled.div`
	margin-bottom: 1.75rem;
`;

const Wrapper = styled.div`
	margin-top: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
`;

export default LoginPage;

import { FC } from 'react';
import { InputField } from '../../components/form/InputField';
import { Input } from '../../components/form/Input';
import { Button } from '../../components/form/Button';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { LogoPic } from '../../assets/img/index';
import { LOGIN_ROUTE } from '../../utils/consts';
import {
	useSetRegisterUserMutation,
	useSetLoginUserMutation,
} from '../../store/service/goodsService';
import { useDispatch } from 'react-redux';
import { setUser, setAccessToken } from '../../store/slices/userSlice';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
	if (typeof window !== 'undefined') return <Register />;
};
const Register: FC = () => {
	const dispatch = useDispatch();
	const [postReg] = useSetRegisterUserMutation();
	const [postToken] = useSetLoginUserMutation();
	const router = useRouter();

	type TSignUp = {
		email: string;
		password: string;
		repeat: string;
		name: string;
		surname?: string;
		city?: string;
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<TSignUp>();

	const onSubmit = async (data: TSignUp) => {
		await postReg({
			body: {
				email: data.email,
				password: data.password,
				name: data.name,
			},
		})
			.unwrap()
			.then(async (response) => {
				dispatch(
					setUser({
						email: response.email,
						password: response.password,
						name: response.name,
					})
				);
				await postToken({
					body: {
						email: data.email,
						password: data.password,
					},
				})
					.unwrap()
					.then((token) => {
						dispatch(
							setAccessToken({
								access_token: token.access_token,
								refresh_token: token.refresh_token,
								token_type: token.token_type,
							})
						);
					})
					.catch((err) => alert(err));
			});
		setTimeout(() => {
			router.push(LOGIN_ROUTE, { scroll: false });
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
							required: 'Заполните данное поле',
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
							required: 'Заполните данное поле',
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
				<InputField error={errors.repeat?.message}>
					<Input
						type="password"
						{...register('repeat', {
							validate: (value) =>
								value === getValues('password') ||
								'Пароли не совпадают',
							required: 'Заполните данное поле',
						})}
						placeholder="Repeat Password"
					/>
				</InputField>
				<InputField error={errors.name?.message}>
					<Input
						{...register('name', {
							required: 'Заполните данное поле',
							pattern: {
								value: /^[A-Z0-9._%+-]+$/i,
								message: 'Некорректный ник',
							},
						})}
						placeholder="Name"
					/>
				</InputField>
				<InputField error={errors.surname?.message}>
					<Input {...register('surname')} placeholder="Surname" />
				</InputField>
				<InputField error={errors.city?.message}>
					<Input {...register('city')} placeholder="City" />
				</InputField>
				<Buttons>
					<Button type="submit" $color>
						Зарегистрироваться
					</Button>
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
	box-shadow: 0 0.25reexport default MainPage;
	html {
		background-color: #f5f5f5;
	}
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

const Buttons = styled.div``;

export default RegisterPage;

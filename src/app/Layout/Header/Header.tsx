'use client'
import { FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MAIN_ROUTE,PROFILE_ROUTE_ME } from '../../../utils/consts';
import { Button } from '../../../components/form/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import * as S from './style';
export const Header: FC = () => {
	const Auth = useSelector(
		(state: RootState) => state.userReducer.access_token
	);

	const [auth, setAuth] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		if (Auth !== '') {
			setAuth(true);
		} else if (Auth === '') {
			setAuth(false);
		}
	}, [Auth]);
	const isAuth = auth;
	return (
		<>
			{pathname === '/register' || pathname === '/login' ? (
				''
			) : (
				<S.Wrapper
					style={{
						backgroundColor: pathname === '/' ? '#009EE4' : '#009EE4',
					}}
				>
					<S.MyContainer>
						<S.Img to={MAIN_ROUTE}></S.Img>
						{!isAuth ? (
							<Link to="/login">
								<Button style={{ margin: '1rem' }} $color $border>
									Вход в личный кабинет
								</Button>
							</Link>
						) : (
							<S.ButtonBox>
								<Button style={{ margin: '1rem' }} $color $border>
									Разместить объявление
								</Button>
								<Link to={PROFILE_ROUTE_ME}>
									<Button style={{ margin: '1rem' }} $color $border>
										Личный кабинет
									</Button>
								</Link>
							</S.ButtonBox>
						)}
					</S.MyContainer>
				</S.Wrapper>
			)}
		</>
	);
};

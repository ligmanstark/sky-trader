'use client';
import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { MAIN_ROUTE, PROFILE_ROUTE_ME } from '../../../utils/consts';
import { Button } from '../../../components/form/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { usePathname } from 'next/navigation';
import { ModalControl } from '../../../components/modals/ModalControl';
import { ModalPost } from '../../../components/modals/postNewReq/ModalPost';
import * as S from './style';
export const Header: FC = () => {
	const Auth = useSelector(
		(state: RootState) => state.userReducer.access_token
	);

	const [auth, setAuth] = useState(false);
	const pathname = usePathname();

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
						<S.Img href={MAIN_ROUTE}></S.Img>
						{!isAuth ? (
							<Link href="/login">
								<Button style={{ margin: '1rem' }} $color $border>
									Вход в личный кабинет
								</Button>
							</Link>
						) : (
							<S.ButtonBox>
								<ModalControl id="post" modal={<ModalPost />}>
									<Button style={{ margin: '1rem' }} $color $border>
										Разместить объявление
									</Button>
								</ModalControl>

								<Link href={PROFILE_ROUTE_ME}>
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

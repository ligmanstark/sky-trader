'use client';
import { GlobalStyles } from '../../../styled/GlobalStyles';
import ProfilePage from '../../../pages/profile/Profile';
import { Header } from '../../Layout/Header/Header';
import { Footer } from '../../Layout/Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';
const ProfileMe = () => {
	const user = useSelector(
		(state: RootState) => state.userReducer.access_token
	);

	useLayoutEffect(() => {
		if (user === '') {
			redirect('/login');
		}
	}, []);
	if (typeof window !== 'undefined')
		return (
			<>
				<GlobalStyles />
				<>
					<Header />
					<ProfilePage />
					<Footer />
				</>
			</>
		);
};

export default ProfileMe;

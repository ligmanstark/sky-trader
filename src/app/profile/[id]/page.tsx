'use client';
import { GlobalStyles } from '../../../styled/GlobalStyles';
import SellerCard from '../../../pages/sellerCard/SellerCard';
import { Header } from '../../Layout/Header/Header';
import { Footer } from '../../Layout/Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';
type Props = {
	params: {
		id: string;
	};
};
const Profile = ({ params: { id } }: Props) => {
	const user = useSelector((state:RootState)=>state.userReducer.access_token)

	useLayoutEffect(() => {
		if (user==='') {
			redirect('/login')
		}
	},[])
	if (typeof window !== 'undefined')
		return (
			<>
				<GlobalStyles />
				<>
					<Header />
					<SellerCard />
					<Footer />
				</>
			</>
		);
};

export default Profile;

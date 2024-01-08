'use client';

import { GlobalStyles } from '../../../styled/GlobalStyles';
import GoodsCard from '../../../pages/goodsCard/GoodsCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { redirect } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { Header } from '../../Layout/Header/Header';
import { Footer } from '../../Layout/Footer/Footer';
type Props = {
	params: {
		id: string;
	};
};
const Goods = ({ params: { id } }: Props) => {
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
				<><Header/>
					<GoodsCard />
					<Footer/>
				</>
			</>
		);
};

export default Goods;

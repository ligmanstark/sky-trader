'use client';
import { useLayoutEffect } from 'react';
import { redirect } from 'next/navigation';
import { MAIN_ROUTE } from '../../../utils/consts';
import { GlobalStyles } from '../../../styled/GlobalStyles';
import GoodsCard from '../../../pages/goodsCard/GoodsCard';
 type Props = {
	params: {
		id: string;
	};
};
const Goods = ({ params: { id } }: Props) => {
	useLayoutEffect(() => {
		if (localStorage.getItem('token') === '') {
			redirect(MAIN_ROUTE);
		}
	},[]);

	if (typeof window !== 'undefined')
		return (
			<>
				<GlobalStyles />
				<>
					<GoodsCard />
				</>
			</>
		);
};

export default Goods;

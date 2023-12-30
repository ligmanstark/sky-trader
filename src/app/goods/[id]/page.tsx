'use client';
import { GlobalStyles } from '../../../styled/GlobalStyles';
import GoodsCard from '../../../pages/goodsCard/GoodsCard';
type Props = {
	params: {
		id: string;
	};
};
const Goods = ({ params: { id } }: Props) => {
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

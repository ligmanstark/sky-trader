import { FC } from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { YourSellerItem } from './sellerItem/YourSellerItem';
export const YourSellerGoods: FC = () => {
	const ID = useSelector(
		(state: RootState) => state.userReducer.id
	);
	const goods = useSelector((state: RootState) => state.goodsReducer.data);
	const currentID = ID;
	const sellerGoods = goods.filter((el) => currentID === el.user_id);
	return (
		<S.Wrapper>
			<S.Box>
				<S.H1Ad>Товары продавца</S.H1Ad>
				<S.Sells>
					{goods &&
						sellerGoods.map((goods) => (
							<YourSellerItem key={goods.id} {...goods} />
						))}
				</S.Sells>
			</S.Box>
		</S.Wrapper>
	);
};

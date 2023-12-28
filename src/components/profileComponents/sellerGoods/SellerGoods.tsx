import { FC } from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { SellerItem } from './sellerItem/SellerItem';
export const SellerGoods: FC = () => {
	const currentState = useSelector(
		(state: RootState) => state.goodsReducer.currentState
	);
	const goods = useSelector((state: RootState) => state.goodsReducer.data);
	// eslint-disable-next-line
	//@ts-ignore
	const currentID = currentState.user.id;
	const sellerGoods = goods.filter((el) => currentID === el.user_id);
	console.log(sellerGoods);
	return (
		<S.Wrapper>
			<S.Box>
				<S.H1Ad>Товары продавца</S.H1Ad>
				<S.Sells>
					{goods &&
						sellerGoods.map((goods) => (
							<SellerItem key={goods.id} {...goods} />
						))}
				</S.Sells>
			</S.Box>
		</S.Wrapper>
	);
};

import { FC } from 'react';
import { GoodsItem } from '../goodsItem/GoodsItem';
import * as S from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const GoodsList: FC = () => {
	const goods = useSelector((state: RootState) => state.goodsReducer.data);
	const searchData = useSelector(
		(state: RootState) => state.goodsReducer.searchData
	);
 
	return (
		<S.GoodsBox>
			{searchData && searchData.length < 1 ? (
				<>{goods && goods.map((el) => <GoodsItem key={el.id} {...el} />)}</>
			) : (
				<>
					{searchData &&
						searchData.map((el) => <GoodsItem key={el.id} {...el} />)}
				</>
			)}
		</S.GoodsBox>
	);
};

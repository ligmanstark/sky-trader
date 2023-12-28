import { FC } from 'react';
import * as S from './style';
import { SellerInfo } from './sellerInfo/SellerInfo';
import { SellerGoods } from './sellerGoods/SellerGoods';
export const ProfileComponents: FC = () => {
	return (
		<S.Wrapper>
			<S.Box>
				<SellerInfo />
				<SellerGoods />
			</S.Box>
		</S.Wrapper>
	);
};

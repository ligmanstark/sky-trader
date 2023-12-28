import { FC } from 'react';
import * as S from './style';
import { YourSellerInfo } from './yourSellerInfo/YourSellerInfo';
import { YourSellerGoods } from './yourSellerGoods/YourSellerGoods';
export const YourProfileComponent: FC = () => {
	return (
		<S.Wrapper>
			<S.Box>
				<YourSellerInfo />
				<YourSellerGoods />
			</S.Box>
		</S.Wrapper>
	);
};

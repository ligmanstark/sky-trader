// eslint-disable-next-line
//@ts-nocheck
'use client'

import { FC, useState } from 'react';
import * as S from './style';
import { BASE_URL } from '../../../utils/consts';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { Button } from '../../form/Button';
export const SellerInfo: FC = () => {
	const [showPhone, isShowPhone] = useState(false);

	const goods = useSelector(
		(state: RootState) => state.goodsReducer.currentState
	);
	// eslint-disable-next-line
	//@ts-ignore
	const startSells = goods.user.sells_from
		.slice(0, 10)
		.split('-')
		.reverse()
		.reduce((el: any, sum: any) => el + '.' + sum);
	// eslint-disable-next-line
	//@ts-ignore
	const newPhone = goods.user.phone.slice(0, 7) + 'XXXXXX';
	const phoneShow = () => {
		isShowPhone((prev) => !prev);
	};
	return (
		<S.Wrapper>
			{goods && goods ? (
				<S.Box>
					<S.H1Ad>Профиль продавца</S.H1Ad>
					<S.SubBox>
						<S.SubBoxAvatar>
							<S.Img src={`${BASE_URL}/${goods.user.avatar}`} />
						</S.SubBoxAvatar>
						<S.SubBoxInfo>
							<S.SellerName>{goods.user.name}</S.SellerName>
							<S.H3Ad>{goods.user.city}</S.H3Ad>
							<S.SellerStartSells>{`Продает товары с ${startSells}`}</S.SellerStartSells>
							<S.Buttons>
								{!showPhone ? (
									<Button $color $border onClick={phoneShow}>
										{`Показать телефон`}
										<br />
										{newPhone}
									</Button>
								) : (
									<Button $color $border onClick={phoneShow}>
										{`Показать телефон`}
										<br />
										{goods.user.phone}
									</Button>
								)}
							</S.Buttons>
						</S.SubBoxInfo>
					</S.SubBox>
				</S.Box>
			) : (
				''
			)}
		</S.Wrapper>
	);
};

import { FC } from 'react';
import * as S from './style';
import { TGoods } from '../../../store/service/types/TGoods';

export const DescriptionShow: FC<TGoods> = (props) => {
	const {description}=props
	return <S.Box>
		<S.Title>Описание товара</S.Title>
		<S.Description>
			{description? description:'Тут пока пусто :('}
		</S.Description>
	</S.Box>;
};

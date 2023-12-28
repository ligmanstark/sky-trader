import { FC, useEffect } from 'react';
import * as T from './types/index';
import { BASE_URL } from '../../utils/consts';
import * as S from './style';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ImageNoIcon } from '../../assets/img/index';
export const GoodsItem: FC<T.TGoods> = (props) => {
	const token = useSelector(
		(state: RootState) => state.userReducer.access_token
	);

	const { title, description, id, images, price, user, created_on } = props;
	const newDate = created_on
		.slice(0, 10)
		.split('-')
		.reverse()
		.reduce((el, sum) => el + '.' + sum);
	useEffect(() => {
		localStorage.setItem('token', token as string);
	});

	return (
		<Link
			to={`/goods/${id}`}
			className="btn"
			style={{
				textDecoration: 'none',
			}}
			replace={true}
		>
			<S.Wrapper key={id}>
				<div>
					{images[0] && images[0].url ? (
						<S.Image src={`${BASE_URL}/${images[0].url}`} />
					) : (
						<ImageNoIcon/>
					)}
				</div>
				<S.CardInfo>
					<S.Title>{title}</S.Title>
					<S.Description>
						{description ? description : 'Описание отсутствует'}
					</S.Description>
					<div>{`${price}₽`}</div>
					<S.UserInfo>
						<div>{`${user.name} из ${user.city}`}</div>
						<div>{`Создано: ${newDate}`}</div>
					</S.UserInfo>
				</S.CardInfo>
			</S.Wrapper>
		</Link>
	);
};

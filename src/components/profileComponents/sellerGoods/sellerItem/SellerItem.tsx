import { FC } from 'react';
import * as T from './types/index';
import { BASE_URL } from '../../../../utils/consts';
import * as S from './style';
import { Link } from 'react-router-dom';

export const SellerItem: FC<T.TGoods> = (props) => {
	const { title, id, images, price, user, created_on } = props;
	console.log(images[0]);
	const newDate = created_on
		.slice(0, 10)
		.split('-')
		.reverse()
		.reduce((el, sum) => el + '.' + sum);

	return (
		<Link
			to={`/goods/${id}`}
			className="btn"
			style={{
				textDecoration: 'none',
			}}
		>
			<S.Wrapper key={id}>
				<div>
					{images[0] && images[0].url ? (
						<S.Image src={`${BASE_URL}/${images[0].url}`} />
					) : (
						<S.Image src="../src/assets/img/withoutImg.jpeg" />
					)}
				</div>
				<S.CardInfo>
					<S.Title>{title}</S.Title>

					<div>{`${price}₽`}</div>
					<S.UserInfo>
						<div>{`${user.city}`}</div>
						<div>{`Создано: ${newDate}`}</div>
					</S.UserInfo>
				</S.CardInfo>
			</S.Wrapper>
		</Link>
	);
};

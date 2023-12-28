import { FC } from 'react';
import * as S from './style';
import { TComments } from '../../../store/service/types/TComments';
import { BASE_URL } from '../../../utils/consts';
export const ItemComments: FC<TComments> = (props) => {
	const { text, created_on, author } = props;
	const newDate = created_on
		.slice(0, 10)
		.split('-')
		.reverse()
		.reduce((el, sum) => el + '.' + sum);
	return (
		<S.Wrapper>
			<S.ItemBox>
				<S.SubItemBox>
					<S.ImgBox>
						<S.Img src={`${BASE_URL}/${author.avatar}`} alt=''/>
					</S.ImgBox>
					<S.H2AdBox>{author.name}</S.H2AdBox>
					<S.PAd>Запостил: {newDate}</S.PAd>
				</S.SubItemBox>
				<S.ItemBoxContent>
					<S.H4AdBox>Комментарий</S.H4AdBox>
					<S.PContent>{text}</S.PContent>
				</S.ItemBoxContent>
			</S.ItemBox>
		</S.Wrapper>
	);
};

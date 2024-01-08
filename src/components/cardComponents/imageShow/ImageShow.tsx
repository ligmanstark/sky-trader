import { FC } from 'react';
import * as S from './style';
import { BASE_URL } from '../../../utils/consts';
import { TGoods } from '../../../store/service/types/TGoods';
import { ImageNoIcon } from '../../../assets/img/index';
export const ImageShow: FC<TGoods> = (props) => {
	const { images } = props;

	return (
		<S.Box>
			{images.length > 0 ? (
				<>
					<S.BigImage src={`${BASE_URL}/${images[0].url}`} alt="" />
					<S.SmallBox>
						{images.length > 1 ? (
							images.map((el) => (
								<S.SmallImage
									src={`${BASE_URL}/${el.url}`}
									key={el.id}
								/>
							))
						) : (
''						)}
					</S.SmallBox>
				</>
			) : (
				<S.BigImage src="../src/assets/img/withoutImg.jpeg" alt="" />
			)}
		</S.Box>
	);
};

'use client'
import { FC, useEffect, useState } from 'react';
import * as S from './style';
import { ImageShow } from './imageShow/ImageShow';
import { DescriptionShow } from './descriptionShow/DescriptionShow';
import { ArticleInfo } from './articleInfo/ArticleInfo';
 import { useParams } from 'next/navigation';
import { useLazyGetByIdGoodQuery } from '../../store/service/goodsService';
import { TGoods } from '../../store/service/types/TGoods';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
	setCurrentStateDate,
	setCurrentIDStateDate,
} from '../../store/slices/goodsSlice';
export const CardComponents: FC = () => {
const stateCurr = useSelector((state:RootState)=>state.goodsReducer.currentState)
	const dispatch = useDispatch();
	const [currentState, setCurrentState] = useState<TGoods>();
 	const  id  = useParams();
	const [fetchSearch] = useLazyGetByIdGoodQuery();
	console.log(id);
	useEffect(() => {
		if (typeof id !==undefined)
		fetchSearch(Number(id?.id))
			.unwrap()
			.then((data) => {
				setCurrentState(data);
				dispatch(setCurrentStateDate(data));
				dispatch(setCurrentIDStateDate(data.id));
			})
			.catch((err) => alert(err));
	}, [dispatch, fetchSearch, id,stateCurr ]);

	return (
		<S.Wrapper>
			<S.SubWrapper>
				<S.Box>{currentState && <ImageShow {...currentState} />}</S.Box>
				<S.Box>
					{currentState && <DescriptionShow {...currentState} />}
				</S.Box>
			</S.SubWrapper>
			<S.SubWrapper>
				<S.Box>{currentState && <ArticleInfo {...currentState} />}</S.Box>
			</S.SubWrapper>
		</S.Wrapper>
	);
};

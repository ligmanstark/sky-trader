'use client';
import { FC } from 'react';
import styled from '@emotion/styled';

import { Container } from '../../styled/components';
 import { Search } from '../../components/search/Search';
 import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setGoods, setSearchGood } from '../../store/slices/goodsSlice';
import {
	useGetAllGoodsQuery,
	useLazyGetAllGoodsQuery,
	useLazyGetByIdGoodQuery,
} from '../../store/service/goodsService';
import { Logomini } from '../../assets/img/index';
import { useEffect } from 'react';
import { GoodsList } from '../../components/goodsList/GoodsList';
import { searchID } from '../../components/helpers/searchID';

 
const MainPage = () => {
	if (typeof window !== 'undefined')
		return (
			<>
 
				<Main />
 			</>
		);
};

const Main: FC = () => {
	const dispatch = useDispatch();
	const [updateFetch]=useLazyGetAllGoodsQuery()
	const currentUser = useSelector((state:RootState)=>state.goodsReducer.currentState)
	const { data = [], isLoading } = useGetAllGoodsQuery();
	const searchRef = useSelector(
		(state: RootState) => state.goodsReducer.searchRef
	);
	const [fetchSearch] = useLazyGetByIdGoodQuery();

	useEffect(() => {
		updateFetch()
		dispatch(setGoods(data));
	}, [currentUser, dispatch, isLoading]);

	const fetchGood = () => {
		if (searchRef !== '') {
			console.log(searchID(data, searchRef));
			const searchDataID: number = searchID(data, searchRef)[0].id;
			console.log(searchID(data, searchRef));
			fetchSearch(searchDataID)
				.unwrap()
				.then((data) => {
					dispatch(setSearchGood([data]));
				})
				.catch((err) => alert(err));
		} else if (searchRef === '') {
			dispatch(setSearchGood([]));
		}
	};

	return (
		<>
 
			<SMain>
				<Container>
					<SearchBox>
						{/* <Loader /> */}
						<div
							style={{
								marginTop: '1rem',
							}}
						>
							<Logomini />
						</div>
						<Search hasError={!data} onSubmit={fetchGood} />
					</SearchBox>
					<TitleBlock>
						<>
							<TitleBlockH1>Объявления</TitleBlockH1>
						</>
					</TitleBlock>
					<GoodsList />
				</Container>
			</SMain>
		</>
	);
};

const SMain = styled.div`
	background-color: #f5f5f5;
	padding-bottom: 3.75rem;
	position: relative;
`;
const SearchBox = styled.div`
	display: flex;
	flex-direction: row;
	gap: 1rem;
	flex-wrap: nowrap;
	align-items: center;
`;
const TitleBlock = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const TitleBlockH1 = styled.h1`
	color: black;
	font-variant-numeric: lining-nums proportional-nums;
	font-size: 2.5rem;
	font-style: normal;
	line-height: 91.5%; /* 54.9px */
	letter-spacing: -0.07306rem;
	max-width: 51rem;
`;

const ScrollUpBtn = styled.button`
	cursor: pointer;
	padding: 0.4375rem 1.5rem 0.5625rem 1.5rem;
	margin: 0 auto;
	display: block;
	border-radius: 2.875rem;
	background: #c7e957;
	height: 3rem;
	color: #000;
	text-align: center;
	font-variant-numeric: lining-nums proportional-nums;
	font-size: 1.5rem;
	font-style: normal;
	line-height: 32px; /* 133.333% */
	letter-spacing: -0.00625rem;
	transition: background 0.3s;

	&:hover {
		background: #daf289;
	}

	&:active {
		background: #ebffab;
	}
`;

export default MainPage;

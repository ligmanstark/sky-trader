import { FC, useState, useEffect } from 'react';
import * as S from './style';
import { TGoods } from '../../../store/service/types/TGoods';
import { Button } from '../../form/Button';
import { BASE_URL } from '../../../utils/consts';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MAIN_ROUTE } from '../../../utils/consts';
import { ModalControl } from '../../modals/ModalControl';
import { ModalComments } from '../../modals/comments/ModalComments';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import {
	useLazyGetAllCommentsQuery,
	useDeleteADSMutation,
	useLazyGetAllGoodsQuery,
} from '../../../store/service/goodsService';
import { setComments } from '../../../store/slices/commentsSlice';
import { ModalUpdatePost } from '../../modals/updatePost/ModalUpdatePost';  
export const ArticleInfo: FC<TGoods> = (props) => {
	const router = useRouter();

	const dispatch = useDispatch();
	const token = useSelector(
		(state: RootState) => state.userReducer.access_token
	);
	const idCurrentState = useSelector(
		(state: RootState) => state.goodsReducer.idCurrentState
	);
	const CurrentState = useSelector(
		(state: RootState) => state.goodsReducer.currentState
	);
	const commentLength = useSelector(
		(state: RootState) => state.commentsReducer.data
	);
	const currentUser = useSelector((state: RootState) => state.userReducer.id);
	const [fetchComments] = useLazyGetAllCommentsQuery();
	const [deleteADS] = useDeleteADSMutation();
	const [updateGoods] = useLazyGetAllGoodsQuery();
	const [showPhone, isShowPhone] = useState(false);
	const { title, price, created_on, user } = props;

	useEffect(() => {
		fetchComments({ id: idCurrentState, accessToken: token as string })
			.unwrap()
			.then((response) => {
				dispatch(setComments(response));
			});
	}, [CurrentState]);
	const newDate = created_on
		.slice(0, 10)
		.split('-')
		.reverse()
		.reduce((el, sum) => el + '.' + sum);

	const startSells = user.sells_from
		.slice(0, 10)
		.split('-')
		.reverse()
		.reduce((el, sum) => el + '.' + sum);
	const newPhone = user?.phone?.slice(0, 7) + 'XXXXXX';
	const phoneShow = () => {
		isShowPhone((prev) => !prev);
	};
	const handleDelete = () => {
		deleteADS({ accessToken: token as string, id: props.id as number })
			.unwrap()
			.then((res) => {
				updateGoods();
				setTimeout(() => {
					router.push(MAIN_ROUTE, { scroll: false });
				}, 1500);
			});
	};
	return (
		<S.Box>
			<S.H1Ad>{title}</S.H1Ad>
			<S.H3Box>
				<S.H3Ad>{`Создано: ${newDate}`}</S.H3Ad>
				<S.H3Ad>{user.city}</S.H3Ad>
				<ModalControl id="comments" modal={<ModalComments />}>
					<S.H3FB style={{ cursor: 'pointer' }}>
						{`${commentLength.length} отзывов`}
					</S.H3FB>
				</ModalControl>
			</S.H3Box>
			<S.SellsBox>
				<S.H1Ad>{`${price} ₽`}</S.H1Ad>
				{currentUser === user.id ? (
					<S.CurrentBTN>
						<ModalControl id="change-post" modal={<ModalUpdatePost/>}>
						<Button $color $border>
							Редактировать объявление
						</Button>
</ModalControl>
						
						<Button $color $border onClick={handleDelete}>
							Снять с публикации
						</Button>
					</S.CurrentBTN>
				) : (
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
								{user.phone}
							</Button>
						)}
					</S.Buttons>
				)}

				<S.SellerBox>
					<S.SellerImg src={`${BASE_URL}/${user.avatar}`} />
					<S.SubSellerBox>
						<>
						{currentUser === user.id?<Link
							href={`/profile/me`}
							style={{
								textDecoration: 'none',
							}}
 						>
							<S.SellerName>{user.name}</S.SellerName>
							<S.SellerStartSells>{`Продает товары с ${startSells}`}</S.SellerStartSells>
						</Link>:<Link
							href={`/profile/${user.id}`}
							style={{
								textDecoration: 'none',
							}}
 						>
							<S.SellerName>{user.name}</S.SellerName>
							<S.SellerStartSells>{`Продает товары с ${startSells}`}</S.SellerStartSells>
						</Link>}
						</>
						
					</S.SubSellerBox>
				</S.SellerBox>
			</S.SellsBox>
		</S.Box>
	);
};

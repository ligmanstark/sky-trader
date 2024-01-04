import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as T from './types/index';
import { createQueryString } from '../../components/helpers/api';
import { BASE_URL } from '../../utils/consts';
 
 type TFields = Record<string, string | number>;
export const goodsApi = createApi({
	reducerPath: 'goodsApi',
	tagTypes: ['Users', 'Goods'],
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (builder) => ({
		getAllGoods: builder.query<T.TGoods[], void>({
			query: () => ({
				url: '/ads/',
				method: 'GET',
				headers: {
					'content-type': 'application/json',
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({
								type: 'Goods' as const,
								id,
							})),
							{ type: 'Goods', id: 'LIST' },
]
					: [{ type: 'Goods', id: 'LIST' }],
		}),
		getByIdGood: builder.query<T.TGoods, number>({
			query: (ID) => ({
				url: `ads/${ID}`,
				method: 'GET',
				headers: {
					'content-type': 'application/json',
				},
			}),
		}),
		getAllUsers: builder.query<T.TUsers[], void>({
			query: () => ({
				url: '/user/all',
				method: 'GET',
				headers: {
					'content-type': 'application/json',
				},
			}),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({
								type: 'Users' as const,
								id,
							})),
							{ type: 'Users', id: 'LIST' },
 ]
					: [{ type: 'Users', id: 'LIST' }],
		}),
		setRegisterUser: builder.mutation<T.TRegisterUser,{ body: T.TRegisterUserReq }>({
			query: ({ body }) => ({
				url: '/auth/register',
				method: 'POST',
				body,
				headers: {
					'content-type': 'application/json',
				},
			}),
		}),
		setLoginUser: builder.mutation<T.TUserAuth, { body: T.TUserReq }>({
			query: ({ body }) => ({
				url: '/auth/login',
				method: 'POST',
				body,
				headers: {
					'content-type': 'application/json',
				},
			}),
		}),
		setRefreshToken: builder.mutation<T.TRefreshToken, T.TRefreshTokenReq>({
			query: (body) => ({
				url: '/auth/login',
				method: 'PUT',
				body,
				headers: {
					'content-type': 'application/json',
				},
			}),
		}),
		getUser: builder.query<T.TUpdateUser, { accessToken: string }>({
			query: ({ accessToken }) => ({
				url: '/user',
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}),
		}),
		updateUser: builder.mutation<T.TUpdateUser,{ body: T.TUpdateUserReq; accessToken: string }>({
			query: ({ body, accessToken }) => ({
				url: '/user',
				method: 'PATCH',
				body,
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}),
		}),
		updatePassword: builder.mutation<T.TUpdatePassword,{ body: T.TUpdatePasswordReq; accessToken: string }>({
			query: ({ body, accessToken }) => ({
				url: '/user/password',
				method: 'PUT',
				body,
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}),
		}),
		updateUserAvatar: builder.mutation<T.TUpdateUser, { credent: File | null; accessToken:string} >({
			query: ({credent,accessToken}) => {
				const formData = new FormData()
				if (credent) {
					formData.append('file', credent)
					console.log('then=',credent);
				} else {
					console.log('error=',credent);

				}
				return {
					url: '/user/avatar/',
					method: 'POST',
					body: formData,
					headers: {
 						Authorization: `Bearer ${accessToken}`,
					},
				}
			}
		}),
		getAllComments: builder.query<T.TComments[] | null,{id:number,accessToken:string}>({
			query: ({id,accessToken}) => ({
				url: `/ads/${id}/comments`,
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,

				}
			})
		}),
		postComment: builder.mutation<T.TComments, { body:{text: string}; id:number,accessToken:string}>({
			query: ({body,id,accessToken}) => ({
				url: `/ads/${id}/comments`,
				method: 'POST',
				body:  body,
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${accessToken}`,

				}

			})
		}),
		postAdsWithImg: builder.mutation<T.TGoods, { body: { credent: File | null, fields: { title: string, description: string, price: number } },accessToken:string}>({
			query: ({ body, accessToken }) => {
				
				const formData = new FormData()
				if(body.credent)
				formData.append('file', body.credent)
				const queryString = createQueryString(body.fields);
				return {
					url: `/ads/?${queryString}`,
					method: 'POST',
					body: body,
					headers: {
						Authorization: `Bearer ${accessToken}`,
 
					},
				}
			}
		}),
		postAdsWithoutImg: builder.mutation<T.TGoods, { body: { title: string, description: string, price: number}, accessToken: string }>({
			query: ({ body, accessToken }) => {
  				return {
					url: '/adstext',
					method: 'POST',
					body: body,
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				
				}
				// ({
				// 	url: '/adstext',
				// 	method: 'POST',
				// 	body: body,
				// 	headers: {
				// 		Authorization: `Bearer ${accessToken}`,
				//    },
				// })
			}
		}),
		deleteADS: builder.mutation<void, { id: number, accessToken: string }>({
			query: ({id,accessToken}) => ({
				url: `/ads/${id}`,
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
		}),
		updateADS: builder.mutation<T.TGoods, {body:{title:string,description:string,price:number}, id: number, accessToken: string }>({
			query: ({id,body,accessToken}) => ({
				url: `/ads/${id}`,
				method: 'PATCH',
				body,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
		})

	}),
});

export const {
	useGetAllGoodsQuery,
	useGetAllUsersQuery,
	useSetLoginUserMutation,
	useSetRefreshTokenMutation,
	useSetRegisterUserMutation,
	useLazyGetAllGoodsQuery,
	useLazyGetAllUsersQuery,
	useUpdateUserMutation,
	useUpdatePasswordMutation,
	useUpdateUserAvatarMutation,
	useLazyGetByIdGoodQuery,
	useGetUserQuery,
	useLazyGetUserQuery,
	useLazyGetAllCommentsQuery,
	usePostCommentMutation,
	usePostAdsWithImgMutation,
	usePostAdsWithoutImgMutation,
	useDeleteADSMutation,
	useUpdateADSMutation
} = goodsApi;

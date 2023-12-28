import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as T from './types/index';
import { BASE_URL } from '../../utils/consts';
 
 
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
					formData.append('file',credent)
				}
				return {
					url: '/user/avatar/',
					method: 'POST',
					body: formData,
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			}
		}),
		// updateUserAvatar: builder.mutation<object,{ body: FileReader; accessToken: string }>({
		// 	query: ({ body, accessToken }) => ({
		// 		url: '/user/avatar',
		// 		method: 'POST',
		// 		// credentials: 'include',
		// 		body,
		// 		headers: {
		// 			'content-type': 'application/json',
		// 			Authorization: `Bearer ${accessToken}`,
		// 		},
		// 	}),
		// }),
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
		postComment: builder.mutation<T.TComments, { body: string; id:number,accessToken:string}>({
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
} = goodsApi;

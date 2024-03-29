import { createApi } from "@reduxjs/toolkit/query/react"
import {
	IChangePassword,
	IResetPasswordEmailRequest,
	ISetPassword,
	ISignInData,
} from "../../types/users"
import { customFetchBase } from "./customFetchBase"
import { ITokens } from "../../types/tokens"

export const usersApi = createApi({
	reducerPath: "usersApi",
	tagTypes: ["Authentication"],
	baseQuery: customFetchBase,
	endpoints: (builder) => ({
		postSignIn: builder.mutation<ISignInData, ISignInData>({
			query: (data) => ({
				url: `/users/login/`,
				method: "POST",
				body: data,
			}),
		}),
		postSignOut: builder.mutation<{ refresh: string }, { refresh: string }>(
			{
				query: (refresh) => ({
					url: `/users/logout/`,
					method: "POST",
					body: refresh,
				}),
			}
		),
		postRefreshToken: builder.mutation<ITokens, { refresh: string }>({
			query: (tokens) => ({
				url: `/auth/refresh/`,
				method: "POST",
				body: tokens,
			}),
		}),
		postVerifyToken: builder.mutation<{ token: string }, { token: string }>(
			{
				query: (token) => ({
					url: `/users/verify/`,
					method: "POST",
					body: token,
				}),
			}
		),
		getVerifyEmail: builder.query<void, { token: string }>({
			query: ({ token }) => ({
				url: `/users/email-verify/?token=${token}`,
				method: "GET",
			}),
		}),
		patchChangePassword: builder.mutation<IChangePassword, IChangePassword>(
			{
				query: (password) => ({
					url: `/users/change-password/`,
					method: "PATCH",
					body: password,
				}),
			}
		),
		patchCompletePasswordReset: builder.mutation<
			ISetPassword,
			ISetPassword
		>({
			query: (password) => ({
				url: `/users/password-reset-complete/`,
				method: "PATCH",
				body: password,
			}),
		}),
		getVerifyPasswordReset: builder.query<
			ISetPassword,
			{ token: string; uidb64: string }
		>({
			query: ({ token, uidb64 }) => ({
				url: `/users/password-reset/${uidb64}/${token}/`,
				method: "GET",
			}),
		}),
		postRequestPasswordReset: builder.mutation<
			IResetPasswordEmailRequest,
			IResetPasswordEmailRequest
		>({
			query: (email) => ({
				url: `/users/request-pass-reset/`,
				method: "POST",
				body: email,
			}),
		}),
	}),
})

export const {
	usePostSignInMutation,
	usePostSignOutMutation,
	usePostRefreshTokenMutation,
	usePostVerifyTokenMutation,
} = usersApi

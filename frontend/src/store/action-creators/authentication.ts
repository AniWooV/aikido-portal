import { authenticationActions } from "../reducers/authentication"
import { AppDispatch } from "../store"
import { ISignInData } from "../types/users"
import { api } from "./api"
import { tokenService } from "../services/tokens"
import { loadUserProfile } from "./profile"
import { PushNotificationType } from "../types/pushNotifications"
import { addPushNotification } from './pushNotifications';
import { v4 } from "uuid"

export function signIn(data: ISignInData) {
	return async function (dispatch: AppDispatch) {
		try {
			dispatch(authenticationActions.signIn())

			const body = JSON.stringify({ ...data })

			const response = await api.post("/users/login/", body)

			if (response.data?.tokens?.access) {
				tokenService.setTokens(response.data.tokens)
			}		

			dispatch(authenticationActions.signInSuccess())

			dispatch(loadUserProfile())
			dispatch(addPushNotification({id: v4(), type: PushNotificationType.Success, message: "Вы успешно авторизовались"}))
		} catch (e: any) {
			dispatch(
				authenticationActions.signInFail()
			)

			dispatch(addPushNotification({id: v4(), type: PushNotificationType.Error, message: "Не удалось авторизоваться"}))
		}
	}
}

export function verifyToken() {
	return async function (dispatch: AppDispatch) {
		try {
			dispatch(authenticationActions.verifyToken())

			const body = JSON.stringify({token: `${tokenService.getLocalRefreshToken()}`})

			await api.post("/users/verify/", body)

			dispatch(authenticationActions.verifyTokenSuccess())
		} catch (e) {
			dispatch(
				authenticationActions.verifyTokenFail()
			)
		}
	}
}

export function logOut() {
	return async function (dispatch: AppDispatch) {
		try {
			dispatch(authenticationActions.logOut())

			const body = JSON.stringify({refresh: `${tokenService.getLocalRefreshToken()}`})

			await api.post("/users/logout/", body)

			dispatch(authenticationActions.logOutSuccess())

			tokenService.removeTokens()
		} catch(e) {
			dispatch(authenticationActions.logOutFail())
		}
	}
}

export function refreshToken() {
	return async function (dispatch: AppDispatch) {
		try {
			dispatch(authenticationActions.refreshToken())

			const body = JSON.stringify({refresh: `${tokenService.getLocalRefreshToken()}`})

			const response = await api.post("/users/refresh/", body)

			tokenService.updateLocalAccessToken(response.data.refresh)

			dispatch(authenticationActions.refreshTokenSuccess())
		} catch(e) {
			dispatch(authenticationActions.refreshTokenFail())
		}
	}
}

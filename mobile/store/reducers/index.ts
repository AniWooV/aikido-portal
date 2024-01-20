import { combineReducers } from "@reduxjs/toolkit"
import { authenticationReducer } from "./authentication"
import { profileReducer } from "./profile"
import { pushNotificationsReducer } from "./pushNotifications"
import {
	eventsApi,
	profilesApi,
	statementsApi,
	usersApi,
	clubsApi,
	groupsApi
} from "../apis"

export const rootReducer = combineReducers({
	authentication: authenticationReducer,
	profile: profileReducer,
	pushNotifications: pushNotificationsReducer,
	[eventsApi.reducerPath]: eventsApi.reducer,
	[profilesApi.reducerPath]: profilesApi.reducer,
	[statementsApi.reducerPath]: statementsApi.reducer,
	[usersApi.reducerPath]: usersApi.reducer,
	[clubsApi.reducerPath]: clubsApi.reducer,
	[groupsApi.reducerPath]: groupsApi.reducer,
})

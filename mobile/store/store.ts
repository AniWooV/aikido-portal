import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./reducers"
import {
	eventsApi,
	profilesApi,
	statementsApi,
	usersApi,
	groupsApi,
	clubsApi
} from "./apis"

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			eventsApi.middleware,
			profilesApi.middleware,
			statementsApi.middleware,
			usersApi.middleware,
			groupsApi.middleware,
			clubsApi.middleware
		)
	},
})

export type IRootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]

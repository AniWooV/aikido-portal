import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { IStatement, IStatementGroup } from "../types/statements"
import { customFetchBase } from "./customFetchBase"

export const statementsApi = createApi({
	reducerPath: "statementsApi",
	tagTypes: ["Statements"],
	baseQuery: customFetchBase,
	endpoints: (builder) => ({
		getStatementById: builder.query<IStatement, number>({
			query: (id) => ({ url: `/statements/${id}/download/`, method: "GET" }),
			providesTags: [{ type: "Statements", id: "LIST" }]
		}),
		postStatementByEvent: builder.mutation<IStatement, {event: string}>({
			query: (statement) => ({
				url: `/statements/event/`,
				method: "POST",
				body: statement,
			}),
			invalidatesTags: [{ type: "Statements", id: "LIST" }],
		}),
		postStatementByGroup: builder.mutation<IStatement, IStatementGroup>({
			query: (statement) => ({
				url: `/statements/group/`,
				method: "POST",
				body: statement,
			}),
			invalidatesTags: [{ type: "Statements", id: "LIST" }],
		}),
	}),
})

export const { useGetStatementByIdQuery, usePostStatementByEventMutation, usePostStatementByGroupMutation } =
	statementsApi

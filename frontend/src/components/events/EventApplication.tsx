import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom"
import { getAge, getCorrectDate } from "../../functions"
import Dropdown from "../custom/Dropdown"
import { MouseEvent, useState, useEffect } from "react"
import { getRankProps } from "../../functions/getRankProps"
import {
	useGetEventBySlugQuery,
	useGetStatementByEventIdQuery,
	useGetTrainerGroupBySlugQuery,
	useGetTrainerGroupsQuery,
	usePostStatementByEventMutation,
	usePostStatementByGroupMutation,
} from "../../store/apis"
import { RxCross2, RxPlus } from "react-icons/rx"
import { IEvent, IStatementMember } from "../../store/types"

function EventApplicaition() {
	const navigate = useNavigate()

	const { slug } = useParams()

	const { data: event } = useGetEventBySlugQuery(slug ? slug : "")

	const { data: groups } = useGetTrainerGroupsQuery(1)

	const [activeGroup, setActiveGroup] = useState(
		groups?.results[0].slug || ""
	)

	const { data: chosenGroup } = useGetTrainerGroupBySlugQuery({
		slug: activeGroup,
		page: 1,
	})

	const [createStatement, { data: createdStatement }] =
		usePostStatementByGroupMutation()

	const [eventMembers, setEventMembers] = useState(event?.members || [])

	useEffect(() => {
		setEventMembers(structuredClone(event?.members) || [])
	}, [event])

	console.log(eventMembers)

	async function handleSubmit(event123: MouseEvent<HTMLButtonElement>) {
		event123.preventDefault()

		const statementmember_set: IStatementMember[] = eventMembers.map<IStatementMember>((id) => {
			return {member: id, attestation: event?.is_attestation || false, seminar: event?.is_seminar || false}
		})

		await createStatement({ event: event?.id || 0, statementmember_set: statementmember_set}).unwrap()

		navigate(`/events/${event?.slug}/participants`)
	}

	return (
		<div className="h-full w-full flex flex-col items-center -mt-[2rem] relative">
			<div className="w-full bg-sky-500 p-5 pl-[20%] flex flex-col">
				<h1 className="text-white font-bold text-3xl">{event?.name}</h1>
				<span className="text-white font-bold text-base">
					Даты проведения: {getCorrectDate(event?.date_start || "")} -{" "}
					{getCorrectDate(event?.date_end || "")}
				</span>
				<span className="text-white font-bold text-base">
					Регистрация: {getCorrectDate(event?.reg_start || "")} -{" "}
					{getCorrectDate(event?.reg_end || "")}
				</span>
			</div>
			<div className="w-[50rem] flex flex-col mt-4 gap-4">
				<Dropdown title="Выбрать группу" defaultShow={true}>
					<div className="w-full flex flex-row gap-2">
						{groups?.results.map((group, index) => {
							return (
								<div
									key={index}
									className={`cursor-pointer text-base font-medium border-sky-500 border-2 rounded-md p-1 transition-all duration-300 ${
										activeGroup === group.slug
											? "bg-sky-500 text-white"
											: "bg-white text-black"
									}`}
									onClick={() => setActiveGroup(group.slug)}
								>
									{group.name}
								</div>
							)
						})}
					</div>
				</Dropdown>
				<Dropdown title="Список участников" defaultShow={true}>
					<div className="w-full flex flex-col gap-4">
						{chosenGroup?.results[0].groupmember_set?.map(
							(member, index) => {
								const rankProps = getRankProps(member.rank)

								return (
									<div
										key={index}
										className="w-full bg-white shadow-md flex flex-row"
									>
										<div className="p-2 flex-1 border-r-[1px] border-sky-500 text-xl font-medium">
											{member.last_name}{" "}
											{member.first_name}{" "}
											{member.mid_name}
										</div>
										<div className="flex flex-col p-2 w-[10rem] border-x-[1px] border-sky-500 text-xl gap-1">
											<div
												className={`${rankProps.backgroundColor} ${rankProps.textColor} text-lg rounded-md text-center font-medium`}
											>
												{rankProps.text}
											</div>
										</div>
										<div className="p-2 flex justify-center items-center border-l-[1px] border-sky-500 text-xl font-medium">
											{eventMembers?.includes(
												member.id
											) ? (
												<RxCross2
													className="bg-red-500 text-white rounded-full cursor-pointer"
													onClick={() =>
														setEventMembers(
															(prev) => {
																let newMembers =
																	[
																		...prev.filter(
																			(
																				e
																			) =>
																				e !==
																				member.id
																		),
																	]

																return newMembers
															}
														)
													}
												/>
											) : (
												<RxPlus
													className="bg-green-500 text-white rounded-full cursor-pointer"
													onClick={() =>
														setEventMembers(
															(prev) => {
																let newMembers =
																	[...prev]

																newMembers.push(
																	member.id
																)

																return newMembers
															}
														)
													}
												/>
											)}
										</div>
									</div>
								)
							}
						)}
					</div>
				</Dropdown>
				<div className="flex flex-row gap-4">
					<NavLink
						to={`/events/${event?.slug}`}
						className="text-center mt-4 p-1 px-4 bg-slate-500 hover:bg-slate-400 text-white transition-all duration-300 rounded-md text-lg font-medium flex-1"
					>
						Вернуться
					</NavLink>
					<button
						onClick={handleSubmit}
						className="text-center mt-4 p-1 px-4 bg-sky-500 hover:bg-sky-400 text-white transition-all duration-300 rounded-md text-lg font-medium flex-1"
					>
						Зарегистрировать
					</button>
				</div>
			</div>
		</div>
	)
}

export default EventApplicaition

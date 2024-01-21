import { Link, useLocation, useParams } from "react-router-dom"
import { getAge, getCorrectDate, isEventOpen } from "../../functions"
import { IEvent } from "../../store/types"
import Dropdown from "../custom/Dropdown"
import { MouseEvent, useState } from "react"
import { getRankProps } from "../../functions/getRankProps"
import {
	useGetEventBySlugQuery,
	useGetStatementByEventIdQuery,
	useGetTrainerGroupBySlugQuery,
	useGetTrainerGroupsQuery,
} from "../../store/apis"

function EventParticipants() {
	const { slug } = useParams()

	const { data: event } = useGetEventBySlugQuery(slug ? slug : "")

	const { data: groups } = useGetTrainerGroupsQuery(1)

	const [activeGroup, setActiveGroup] = useState("")

	const { data: chosenGroup } = useGetTrainerGroupBySlugQuery({
		slug: activeGroup,
		page: 1,
	})

	const { data: statement } = useGetStatementByEventIdQuery(event?.id || 0)

	return isEventOpen(event?.date_end || "") ? (
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
			{statement?.link ? (
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
										onClick={() =>
											setActiveGroup(group.slug)
										}
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
									if (!event?.members?.includes(member.id)) {
										return null
									}

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
											<div className="flex flex-col p-2 w-[10rem] border-l-[1px] border-sky-500 text-xl gap-1">
												<div
													className={`${rankProps.backgroundColor} ${rankProps.textColor} text-lg rounded-md text-center font-medium`}
												>
													{rankProps.text}
												</div>
											</div>
										</div>
									)
								}
							)}
						</div>
					</Dropdown>
					{statement?.link ? (
						<Link
							to={statement?.link || "#"}
							target="_blank"
							rel="noopener noreferrer"
							className="text-center mt-4 p-1 px-4 bg-green-700 hover:bg-green-600 text-white transition-all duration-300 rounded-md text-lg font-medium flex-1"
						>
							Открыть ведомость
						</Link>
					) : (
						<button
							disabled
							className="text-center mt-4 p-1 px-4 bg-slate-500 text-white transition-all duration-300 rounded-md text-lg font-medium flex-1"
						>
							Ведомость еще не сформирована
						</button>
					)}
				</div>
			) : (
				<div className="mt-4 flex justify-center items-center">
					<span className="text-red-500 font-bold text-lg">Список участников пуст</span>
				</div>
			)}
		</div>
	) : (
		<div className="h-full w-full flex flex-col items-center -mt-[2rem] relative">
			<div className="w-full bg-sky-500 p-5 pl-[20%] flex flex-col">
				<h1 className="text-white font-bold text-3xl">{event?.name}</h1>
				<span className="text-white font-bold text-base">
					Даты проведения: {getCorrectDate(event?.date_start || "")} -{" "}
					{getCorrectDate(event?.date_end || "")}
				</span>
			</div>
			{statement?.link ? (
				<div className="w-[50rem] flex flex-col mt-4 gap-4">
					<Dropdown title="Выбрать группу" defaultShow={true}>
						<div className="w-full flex flex-row gap-2">
							{groups?.results.map((group, index) => {
								return (
									<div
										key={index}
										className={`cursor-pointer text-base font-medium border-sky-500 border-2 rounded-md p-1 transition-all duration-300 ${
											activeGroup === group.name
												? "bg-sky-500 text-white"
												: "bg-white text-black"
										}`}
										onClick={() =>
											setActiveGroup(group.name)
										}
									>
										{group.name}
									</div>
								)
							})}
						</div>
					</Dropdown>
					<Dropdown title="Список участников" defaultShow={true}>
						<div className="w-full flex flex-col gap-4">
							{chosenGroup?.results[0]?.groupmember_set?.map(
								(member, index) => {
									if (!event?.members?.includes(member.id)) {
										return null
									}

									const rankProps = getRankProps(member.rank)

									return (
										<div
											key={index}
											className="w-full shadow-md flex flex-row"
										>
											<div className="p-2 flex-1 border-r-[1px] border-sky-500 text-xl font-medium">
												{member.last_name}{" "}
												{member.first_name}{" "}
												{member.mid_name}
											</div>
											<div className="flex flex-col p-2 w-[10rem] border-l-[1px] border-sky-500 text-xl gap-1">
												<div
													className={`${rankProps.backgroundColor} ${rankProps.textColor} text-lg rounded-md text-center font-medium`}
												>
													{rankProps.text}
												</div>
											</div>
										</div>
									)
								}
							)}
						</div>
					</Dropdown>
					{statement?.link ? (
						<Link
							to={statement?.link || "#"}
							target="_blank"
							rel="noopener noreferrer"
							className="text-center mt-4 p-1 px-4 bg-green-700 hover:bg-green-600 text-white transition-all duration-300 rounded-md text-lg font-medium flex-1"
						>
							Открыть ведомость
						</Link>
					) : (
						<button
							disabled
							className="text-center mt-4 p-1 px-4 bg-slate-500 text-white transition-all duration-300 rounded-md text-lg font-medium flex-1"
						>
							Ведомость еще не сформирована
						</button>
					)}
				</div>
			) : (
				<div className="mt-4 flex justify-center items-center">
					<span className="text-red-500 font-bold text-lg">Список участников пуст</span>
				</div>
			)}
		</div>
	)
}

export default EventParticipants

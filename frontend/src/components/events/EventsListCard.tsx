import { NavLink, useLocation } from 'react-router-dom';
import { IEvent } from "../../store/types";
import { getCorrectDate, isRegClosed } from "../../functions";

interface EventsListCardProps {
    event: IEvent
}

function EventsListCard({event}: EventsListCardProps) {
    const location = useLocation()

    const dateStartArray = getCorrectDate(event.date_start).split(" ")
    const dateEndArray = getCorrectDate(event.date_end).split(" ")

    const regClosed = isRegClosed(event.reg_end)

    return (
    <NavLink to={`/events/${event.slug}`} className="w-full shadow-md flex flex-row bg-white">
        <div className="flex flex-col p-2 w-[2.5rem] border-r-[1px] border-sky-500 text-2xl font-medium">
            <span>{dateStartArray[0]}</span>
            <span>{dateEndArray[0]}</span>
        </div>
        <div className="flex flex-col p-2 w-[6.25rem] border-x-[1px] border-sky-500 text-xl gap-1">
            <span>{dateStartArray[1]}</span>
            <span>{dateEndArray[1]}</span>
        </div>
        <div className="p-2 flex-1 border-l-[1px] border-sky-500 text-xl font-medium">
            {event.name}
        </div>
        <div className={`p-2 w-[1rem] border-sky-500 text-lg text-medium text-white ${location.pathname === "/events/upcoming" ? regClosed ? "bg-red-500" : "bg-green-500" : "bg-slate-400"}`} />
    </NavLink>
    )
;}

export default EventsListCard;
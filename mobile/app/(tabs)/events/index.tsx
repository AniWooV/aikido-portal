import EventCard from "../../../components/events/EventCard"
import { useState } from "react"
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native"
import { useGetEventsByFilterQuery } from "../../../store/apis"
import { getDateFilter } from "../../../functions"

function Events() {
	const [filter, setFilter] = useState(true)

	// const { data: events, isLoading } = useGetEventsByFilterQuery({
	// 	filter: filter ? "date_end_gte" : "date_end_lte",
	// 	date: getDateFilter(),
	// })

	function handlePress(value: any) {
		setFilter(value)
	}

	const dummy = {
		id: 4,
		name: "V Аттестация по прикладному айкидо",
		reg_start: "2023-09-04",
		reg_end: "2023-09-10",
		date_start: "2023-09-17",
		date_end: "2023-09-17",
		address:
			"стр. Россия, рег. Свердловская область, гор. Екатерибург, ул. Мира 32",
		about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar nulla vel purus pretium mollis. Sed sollicitudin eros non ante finibus, vel semper enim cursus. Mauris fringilla ante quis turpis aliquam consectetur. Aenean vel ex dolor. Donec laoreet vulputate ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar nulla vel purus pretium mollis. Sed sollicitudin eros non ante finibus, vel semper enim cursus. Mauris fringilla ante quis turpis aliquam consectetur. Aenean vel ex dolor. Donec laoreet vulputate ex.",
		is_attestation: true,
		attestation_date: "2023-09-17T14:00:00-05:00",
		is_seminar: false,
		seminar_date: "2023-09-17T14:00:00-05:00",
		slug: "9hZ5qbdArt",
		organizers: [],
		co_organizers: [],
		members: [],
	}

	return (
		<View style={{ backgroundColor: "#f0f9ff", height: "100%" }}>
			<View style={styles.filterView}>
				<Pressable
					onPress={(event) => handlePress(true)}
					style={filter ? styles.filterActive : styles.filterInactive}
				>
					<Text style={styles.filterText}>Предстоящие</Text>
				</Pressable>
				<Pressable
					onPress={(event) => handlePress(false)}
					style={filter ? styles.filterInactive : styles.filterActive}
				>
					<Text style={styles.filterText}>Прошедшие</Text>
				</Pressable>
			</View>
			<ScrollView contentContainerStyle={styles.scroll}>
				{/* {events?.results.map((event, index) => (<EventCard key={index} event={event} />))} */}
				<EventCard event={dummy} />
				<EventCard event={dummy} />
				<EventCard event={dummy} />
				<EventCard event={dummy} />
				<EventCard event={dummy} />
				<EventCard event={dummy} />
				<EventCard event={dummy} />
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	scroll: {
		width: "100%",
		gap: 20,
		padding: 10,
	},
	filterView: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		width: "100%",
		gap: 10,
		padding: 10,
		borderBottomColor: "#0369a1",
		borderBottomWidth: 3,
	},
	filterActive: {
		flex: 1,
		backgroundColor: "#0ea5e9",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 5,
		borderRadius: 7,
	},
	filterInactive: {
		flex: 1,
		backgroundColor: "#6b7280",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 5,
		borderRadius: 7,
	},
	filterText: {
		color: "#FFF",
	},
})

export default Events

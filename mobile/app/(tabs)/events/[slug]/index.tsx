import { Stack, useLocalSearchParams } from "expo-router"
import { StyleSheet, Text, View, ScrollView } from "react-native"
import { useGetEventBySlugQuery } from "../../../../store/apis"
import { getCorrectDate, isRegClosed } from "../../../../functions"
import Dropdown from "../../../../components/base/Dropdown"

function Event() {
	const { slug } = useLocalSearchParams<{ slug: string }>()

	const { data: eventCringe } = useGetEventBySlugQuery(slug)

	const event = {
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
		is_seminar: true,
		seminar_date: "2023-09-17T14:00:00-05:00",
		slug: "9hZ5qbdArt",
		organizers: [],
		co_organizers: [],
		members: [],
	}

	return (
		<View style={{ backgroundColor: "#f0f9ff", height: "100%" }}>
			<Stack.Screen
				options={{ headerShown: true, headerTitle: "Мероприятие" }}
			/>
			<View style={styles.descriptionView}>
				<Text style={styles.name}>{event?.name}</Text>
				<Text style={styles.eventsDates}>
					Проводится:{" "}
					{getCorrectDate(event?.date_start ? event.date_start : "")}{" "}
					- {getCorrectDate(event?.date_end ? event.date_end : "")}
				</Text>
				<Text
					style={
						isRegClosed(event?.reg_end)
							? styles.regClosed
							: styles.regActive
					}
				>
					Регистрация:{" "}
					{getCorrectDate(event?.reg_start ? event.reg_start : "")} -{" "}
					{getCorrectDate(event?.reg_end ? event.reg_end : "")}
				</Text>
			</View>
			<ScrollView contentContainerStyle={styles.scroll}>
				<Dropdown title="Описание" defaultVisible={false}>
					<Text>{event.about}</Text>
				</Dropdown>
				<Dropdown title="Программа" defaultVisible={true}>
					<View>
						{event?.is_attestation ? (
							<Text>
								<Text>Аттестация:</Text>{" "}
								{getCorrectDate(
									event?.attestation_date
										? event?.attestation_date
										: ""
								)}
							</Text>
						) : null}
						{event?.is_seminar ? (
							<Text>
								<Text>Семинар:</Text>{" "}
								{getCorrectDate(
									event?.seminar_date
										? event?.seminar_date
										: ""
								)}
							</Text>
						) : null}
					</View>
				</Dropdown>
				<Dropdown title="Место проведения" defaultVisible={true}>
					<Text>{event?.address || "Не установлено"}</Text>
				</Dropdown>
				<Dropdown title="Контакты" defaultVisible={false}>
					<Text>...</Text>
				</Dropdown>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	descriptionView: {
		backgroundColor: "#0ea5e9",
		padding: 10,
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
	},
	name: {
		color: "#FFF",
		fontSize: 20,
		fontWeight: "800",
	},
	eventsDates: {
		color: "#FFF",
		fontWeight: "500",
	},
	regActive: {
		color: "#FFF",
		fontWeight: "500",
	},
	regClosed: {
		color: "#ef4444",
		fontWeight: "500",
	},
	scroll: {
		width: "100%",
		gap: 20,
		paddingHorizontal: 10,
		paddingTop: 10,
	},
})

export default Event

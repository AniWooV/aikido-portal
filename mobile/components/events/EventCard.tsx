import { Link } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { getCorrectDate } from "../../functions"
import { IEvent } from "../../types"

interface IEventCardProps {
	event: IEvent
}

function EventCard({ event }: IEventCardProps) {
	const dateStart = getCorrectDate(event.date_start)
	const dateEnd = getCorrectDate(event.date_end)

	const regStart = getCorrectDate(event.reg_start)
	const regEnd = getCorrectDate(event.reg_end)

	return (
		<Link href={`events/${event.slug}`} style={styles.card}>
			<View style={styles.cardContent}>
				<View style={styles.image}>
					<Icon name="image" color="#FFF" size={25} />
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.title}>{event.name}</Text>
					<View style={{ flex: 1 }} />
					<View style={styles.datesArea}>
						<View style={styles.dateContainer}>
							<Text style={styles.regDate}>{regStart}</Text>
							<Text style={styles.regDate}>{regEnd}</Text>
						</View>
						<View style={{ flex: 1 }} />
						<View style={styles.dateContainer}>
							<Text style={styles.eventDate}>{dateStart}</Text>
							<Text style={styles.eventDate}>{dateEnd}</Text>
						</View>
					</View>
				</View>
			</View>
		</Link>
	)
}

const styles = StyleSheet.create({
	card: {
		width: "100%",
		backgroundColor: "#FFF",
		borderRadius: 7,
		// boxShadow: "1px 2px 5px rgb(0, 0, 0)"
	},
	image: {
		width: 100,
		height: 100,
		backgroundColor: "#cbd5e1",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderTopLeftRadius: 7,
		borderBottomLeftRadius: 7,
	},
	link: {
		width: "100%",
		backgroundColor: "#000",
	},
	title: {
		flexShrink: 1,
	},
	cardContent: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		borderRadius: 7,
	},
	infoContainer: {
		flex: 1,
		padding: 10,
		display: "flex",
		flexDirection: "column",
		width: 240
	},
	datesArea: {
		display: "flex",
		flexDirection: "row",
	},
	dateContainer: {
		display: "flex",
		flexDirection: "column",
	},
	regDate: {
		fontSize: 10,
	},
	eventDate: {
		fontSize: 10,
		color: "#0ea5e9",
	},
})

export default EventCard

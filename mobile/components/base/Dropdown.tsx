import { useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

interface IDropdown {
	title: string
	defaultVisible: boolean
	children: React.ReactElement | null
}

function Dropdown(props: IDropdown) {
	const [visible, setVisible] = useState(props.defaultVisible)

	function handlePress() {
		setVisible((prev) => !prev)
	}

	function renderDropdown() {
		return visible ? (
			<View style={styles.content}>{props.children}</View>
		) : null
	}

	return (
		<View style={styles.container}>
			<Pressable
				onPress={(event) => handlePress()}
				style={styles.pressable}
			>
				<Text style={styles.title}>{props.title}</Text>
				<View style={{ flex: 1 }} />
				<View>
                    {
                        visible ? <Icon name="keyboard-arrow-up" color={"#000"} size={22} /> : <Icon name="keyboard-arrow-down" color={"#000"} size={22} />
                    }
				</View>
			</Pressable>
			{renderDropdown()}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#FFF",
	},
	title: {
		fontWeight: "600",
		fontSize: 17,
	},
	pressable: {
		padding: 10,
		borderBottomColor: "#0ea5e9",
		borderBottomWidth: 2,
		display: "flex",
		flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
	},
	content: {
		padding: 10,
	},
})

export default Dropdown

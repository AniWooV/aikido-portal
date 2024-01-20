import { Pressable, StyleSheet, Text, View } from "react-native"
import { IRootState } from "../../../store/store"
import { connect } from "react-redux"
import { Redirect } from "expo-router"
import { TextInput } from "react-native-gesture-handler"
import { useActions } from "../../../hooks"
import { useState } from "react"
import {
	useGetGroupBySlugQuery,
	useGetMyProfileQuery,
} from "../../../store/apis"
import Icon from "react-native-vector-icons/FontAwesome"
import { getCorrectDate } from "../../../functions"

interface IProfile {
	isAuthenticated: boolean
	profileIsLoading: boolean
}

const profile = {
	is_trainer: true,
	is_manager: true,
	first_name: "Иван",
	last_name: "Тытенко",
	mid_name: "Дмитриевич",
	avatar: null,
	birth_date: "2002-11-03",
	updated_at: "2023-10-13T12:09:25.726436-05:00",
	slug: "ivantytenkOMKqQ7teWF",
	rank: {
		id: 8,
		name: "4 кю",
	},
	next_rank: 9,
	club: "primepnzs48eCCx",
	group: "cTCydurAMm",
	user: {
		id: 1,
		username: "admin",
		email: "admin@admin.com",
		is_staff: true,
		is_active: true,
		is_verified: true,
		created_at: "2023-10-13T07:00:13.060090-05:00",
		updated_at: "2023-10-13T07:00:13.060132-05:00",
	},
	phones: [],
	photos: [],
}

function Profile({ isAuthenticated }: IProfile) {
	const { data: profile, isLoading: profileIsLoading } =
		useGetMyProfileQuery()

	const { data: group, isLoading: groupIsLoading } = useGetGroupBySlugQuery(
		profile?.group ? profile?.group : ""
	)

	const [inputsValues, setInputValues] = useState({
		username: "",
		password: "",
	})

	const { signIn } = useActions()

	function handleChange(value: String, input: "username" | "password") {
		setInputValues({
			...inputsValues,
			[input]: value,
		})
	}

	function handlePress() {
		signIn(inputsValues)
	}

	return isAuthenticated ? (
		<View
			style={{
				backgroundColor: "#f0f9ff",
				height: "100%",
				padding: 10,
			}}
		>
			<View style={stylesProfile.profileInfo}>
				<View style={stylesProfile.info}>
					<View style={stylesProfile.image}>
						<Icon name="image" color="#FFF" size={25} />
					</View>
					<View style={stylesProfile.baseInfoContainer}>
						<View style={stylesProfile.nameContainer}>
							<Text style={stylesProfile.nameText}>
								{profile?.last_name}
							</Text>
							<Text style={stylesProfile.nameText}>
								{profile?.first_name}
							</Text>
							<Text style={stylesProfile.nameText}>
								{profile?.mid_name}
							</Text>
						</View>
						<View style={{ flex: 1 }} />
						<View style={stylesProfile.birthContainer}>
							<Text style={{ fontSize: 15, fontWeight: "500" }}>
								Дата рождения:
							</Text>
							<Text>
								{getCorrectDate(profile?.birth_date || "")}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	) : (
		<View
			style={{
				backgroundColor: "#f0f9ff",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<View style={stylesSignIn.container}>
				<View style={stylesSignIn.labelView}>
					<Text style={stylesSignIn.labelText}>Войти в аккаунт</Text>
				</View>
				<View style={stylesSignIn.formView}>
					<TextInput
						style={stylesSignIn.textInput}
						placeholder="Логин"
						placeholderTextColor="#94a3b8"
						onChangeText={(text) => handleChange(text, "username")}
					/>
					<TextInput
						style={stylesSignIn.textInput}
						placeholder="Пароль"
						secureTextEntry={true}
						placeholderTextColor="#94a3b8"
						onChangeText={(text) => handleChange(text, "password")}
					/>
				</View>
				<Pressable
					onPress={handlePress}
					style={stylesSignIn.formButton}
				>
					<Text style={stylesSignIn.buttonText}>Войти</Text>
				</Pressable>
			</View>
		</View>
	)
}

const stylesProfile = StyleSheet.create({
	profileInfo: {
		backgroundColor: "#FFF",
		padding: 10,
	},
	image: {
		width: 150,
		height: 150,
		backgroundColor: "#cbd5e1",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	info: {
		display: "flex",
		flexDirection: "row",
		gap: 15,
	},
	baseInfoContainer: {
		display: "flex",
		flexDirection: "column",
	},
	nameContainer: {
		display: "flex",
		flexDirection: "column",
		gap: 3,
	},
	nameText: {
		fontSize: 17,
		fontWeight: "600",
	},
	birthContainer: {
		display: "flex",
		flexDirection: "column",
		gap: 1,
	},
})

const stylesSignIn = StyleSheet.create({
	labelView: {
		borderLeftWidth: 3,
		borderLeftColor: "#0369a1",
		display: "flex",
		justifyContent: "center",
		paddingLeft: 3,
		paddingTop: 4,
	},
	container: {
		width: 300,
		backgroundColor: "#FFF",
		padding: 40,
		borderRadius: 20,
	},
	labelText: {
		fontWeight: "600",
		fontSize: 20,
	},
	formView: {
		marginTop: 20,
		display: "flex",
		flexDirection: "column",
		gap: 10,
	},
	textInput: {
		borderBottomColor: "#0369a1",
		borderBottomWidth: 2,
		width: "100%",
	},
	formButton: {
		marginTop: 20,
		backgroundColor: "#0ea5e9",
		padding: 5,
		borderRadius: 7,
		display: "flex",
		alignItems: "center",
	},
	buttonText: {
		color: "#FFF",
		fontWeight: "600",
	},
})

function mapStateToProps(state: IRootState) {
	return {
		isAuthenticated: state.authentication.isAuthenticated,
		profileIsLoading: state.profile.isLoading,
	}
}

export default connect(mapStateToProps, {})(Profile)

// export default Profile

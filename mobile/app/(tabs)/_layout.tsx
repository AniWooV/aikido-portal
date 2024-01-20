import { Tabs } from "expo-router"
import { useEffect } from "react"
import Icon from "react-native-vector-icons/FontAwesome"
import { useActions } from "../../hooks"
import { connect } from "react-redux"
import { IRootState } from "../../store/store"

interface IStackLayout {
	isAuthenticated: boolean
	profileIsLoading: boolean
}

function StackLayout({ isAuthenticated, profileIsLoading }: IStackLayout) {
	const { verifyToken, loadUserProfile } = useActions()

	useEffect(() => {
		verifyToken()
	}, [])

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: "#0369a1",
					height: 50,
				},
				tabBarActiveTintColor: "#FFF",
				tabBarInactiveTintColor: "#cbd5e1",
				tabBarActiveBackgroundColor: "#0ea5e9",
			}}
		>
			<Tabs.Screen
				name="events"
				options={{
					tabBarLabel: "Мероприятия",
					tabBarIcon: ({ color, size }) => (
						<Icon name="calendar" color={color} size={size} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarLabel: isAuthenticated ? "Профиль" : "Атворизация",
					tabBarIcon: ({ color, size }) => (
						<Icon
							name={isAuthenticated ? "user" : "sign-in"}
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tabs>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		isAuthenticated: state.authentication.isAuthenticated,
		profileIsLoading: state.profile.isLoading,
	}
}

export default connect(mapStateToProps, {})(StackLayout)

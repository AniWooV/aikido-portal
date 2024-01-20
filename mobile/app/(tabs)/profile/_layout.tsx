import { Stack } from "expo-router"
import { connect } from "react-redux"
import { IRootState } from "../../../store/store"

interface IStackLayout {
	isAuthenticated: boolean
	profileIsLoading: boolean
}

function StackLayout({ isAuthenticated, profileIsLoading }: IStackLayout) {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: "#0369a1", height: 50 },
				headerTitleStyle: { color: "#FFF" },
				headerTintColor: "#FFF",
				headerTitleAlign: "center",
				headerShadowVisible: false,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: isAuthenticated ? "Профиль" : "Атворизация",
				}}
			/>
		</Stack>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		isAuthenticated: state.authentication.isAuthenticated,
		profileIsLoading: state.profile.isLoading,
	}
}

export default connect(mapStateToProps, {})(StackLayout)

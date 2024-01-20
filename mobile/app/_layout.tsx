import { Stack } from "expo-router"
import { Provider } from "react-redux"
import { store } from "../store/store"

function StackLayout() {
	return (
		<Provider store={store}>
			<Stack screenOptions={{ headerShown: false, contentStyle: {backgroundColor: "#FFF"} }}>
				<Stack.Screen name="(tabs)" />
			</Stack>
		</Provider>
	)
}

export default StackLayout

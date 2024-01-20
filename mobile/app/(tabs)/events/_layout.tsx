import { Stack } from "expo-router"

function StackLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: "#0369a1", height: 50 },
				headerTitleStyle: { color: "#FFF" },
				headerTintColor: "#FFF",
				headerTitleAlign: "center",
				headerShadowVisible: false
			}}
		>
			<Stack.Screen
				name="index"
				options={{ headerTitle: "Мероприятия" }}
			/>
		</Stack>
	)
}

export default StackLayout

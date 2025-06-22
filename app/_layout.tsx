import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			{/* Navigation Tabs */}
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			{/* Checkout */}
			<Stack.Screen name="checkout" options={{ headerShown: true, title: "Checkout" }} />
		</Stack>
	);
}

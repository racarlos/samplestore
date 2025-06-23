import { CartProvider } from "@/providers/CartProvider";
import { OrdersProvider } from "@/providers/OrdersProvider";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<OrdersProvider>
				<CartProvider>
					<Stack screenOptions={{ headerShown: false }}>
						{/* Navigation Tabs */}
						<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					</Stack>
				</CartProvider>
			</OrdersProvider>
		</SafeAreaProvider>
	);
}

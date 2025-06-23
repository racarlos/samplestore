import { Link, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View className="flex-1 items-center justify-center p-5 bg-white">
				<Text className="text-xl font-bold text-gray-900">Sorry, this page doesn't exist.</Text>
				<Link href="/" className="mt-4 py-4 border-b bg-blue-600 px-4  py-2 rounded-xl">
					<Text className="text-white text-lg">Continue Shopping</Text>
				</Link>
			</View>
		</>
	);
}

import { Stack } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Checkout() {
	return (
		<>
			<Stack.Screen options={{ title: "Checkout" }} />
			<ScrollView className="flex-1 bg-gray-50">
				<View className="p-4">
					{/* Order Summary */}
					<View className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
						<Text className="text-lg font-semibold text-gray-900 mb-3">Order Summary</Text>
						<View className="space-y-2">
							<View className="flex-row justify-between">
								<Text className="text-gray-600">Subtotal</Text>
								<Text className="text-gray-900">$199.98</Text>
							</View>
							<View className="flex-row justify-between">
								<Text className="text-gray-600">Shipping</Text>
								<Text className="text-gray-900">$9.99</Text>
							</View>
							<View className="flex-row justify-between">
								<Text className="text-gray-600">Tax</Text>
								<Text className="text-gray-900">$16.80</Text>
							</View>
							<View className="border-t border-gray-200 pt-2 mt-2">
								<View className="flex-row justify-between">
									<Text className="text-lg font-semibold text-gray-900">Total</Text>
									<Text className="text-lg font-bold text-blue-600">$226.77</Text>
								</View>
							</View>
						</View>
					</View>

					{/* Shipping Address */}
					<View className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
						<Text className="text-lg font-semibold text-gray-900 mb-3">Shipping Address</Text>
						<Text className="text-gray-700">
							John Doe{"\n"}
							123 Main Street{"\n"}
							Anytown, ST 12345
						</Text>
						<TouchableOpacity className="mt-2">
							<Text className="text-blue-600">Change Address</Text>
						</TouchableOpacity>
					</View>

					{/* Payment Method */}
					<View className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
						<Text className="text-lg font-semibold text-gray-900 mb-3">Payment Method</Text>
						<View className="flex-row items-center">
							<View className="w-12 h-8 bg-blue-600 rounded mr-3"></View>
							<Text className="text-gray-700">**** **** **** 1234</Text>
						</View>
						<TouchableOpacity className="mt-2">
							<Text className="text-blue-600">Change Payment Method</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>

			{/* Place Order Button */}
			<View className="bg-white p-4 border-t border-gray-200">
				<TouchableOpacity className="bg-green-600 py-4 rounded-lg">
					<Text className="text-white text-center font-semibold text-lg">Place Order</Text>
				</TouchableOpacity>
			</View>
		</>
	);
}

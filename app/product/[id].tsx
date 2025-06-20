import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProductDetail() {
	const { id } = useLocalSearchParams();

	return (
		<>
			<Stack.Screen options={{ title: `Product ${id}` }} />
			<ScrollView className="flex-1 bg-white">
				{/* Product Image */}
				<View className="h-80 bg-gray-200"></View>

				<View className="p-4">
					{/* Product Info */}
					<Text className="text-2xl font-bold text-gray-900 mb-2">Amazing Product {id}</Text>
					<View className="flex-row items-center mb-4">
						<View className="flex-row items-center mr-4">
							{[1, 2, 3, 4, 5].map((star) => (
								<Ionicons key={star} name="star" size={16} color="#FCD34D" />
							))}
						</View>
						<Text className="text-gray-600">(128 reviews)</Text>
					</View>
					<Text className="text-3xl font-bold text-blue-600 mb-4">$99.99</Text>

					{/* Description */}
					<Text className="text-gray-700 mb-6">
						This is an amazing product with incredible features that will make your life better. High quality materials
						and excellent craftsmanship ensure long-lasting durability.
					</Text>

					{/* Size Selection */}
					<View className="mb-6">
						<Text className="text-lg font-semibold text-gray-900 mb-3">Size</Text>
						<View className="flex-row gap-2">
							{["S", "M", "L", "XL"].map((size) => (
								<TouchableOpacity key={size} className="border border-gray-300 px-4 py-2 rounded-lg">
									<Text className="text-gray-700">{size}</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>

					{/* Color Selection */}
					<View className="mb-8">
						<Text className="text-lg font-semibold text-gray-900 mb-3">Color</Text>
						<View className="flex-row gap-2">
							{["#3B82F6", "#EF4444", "#10B981", "#F59E0B"].map((color) => (
								<TouchableOpacity
									key={color}
									className="w-10 h-10 rounded-full border-2 border-gray-300"
									style={{ backgroundColor: color }}
								/>
							))}
						</View>
					</View>
				</View>
			</ScrollView>

			{/* Add to Cart Button */}
			<View className="bg-white p-4 border-t border-gray-200">
				<TouchableOpacity className="bg-blue-600 py-4 rounded-lg">
					<Text className="text-white text-center font-semibold text-lg">Add to Cart</Text>
				</TouchableOpacity>
			</View>
		</>
	);
}

import { useProducts } from "@/hooks/useProducts";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
	const { resetToSeedData } = useProducts();
	const [isResetting, setIsResetting] = useState(false);

	const handleResetProducts = () => {
		Alert.alert(
			"Reset Products",
			"Are you sure you want to reset all products to default? This action cannot be undone.",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Reset",
					style: "destructive",
					onPress: async () => {
						setIsResetting(true);
						await resetToSeedData();
						setIsResetting(false);
						Alert.alert("Success", "Products have been reset to default values.");
					},
				},
			],
		);
	};

	const settingsItems = [
		{ title: "Order History", icon: "time-outline", subtitle: "View past orders" },
		{ title: "Reset Products", icon: "refresh", subtitle: "Reset products to default" },
		{ title: "Clear All Data", icon: "trash-outline", subtitle: "Delete all app data" },
	];

	return (
		<View className="flex-1 bg-gray-50">
			{/* Header */}
			<View className="bg-white pt-12 pb-4 px-4 border-b border-gray-200">
				<Text className="text-2xl font-bold text-gray-900">Settings</Text>
			</View>

			<ScrollView className="flex-1 px-4 py-4">
				{/* User Profile Section */}
				<View className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
					<View className="flex-row items-center">
						<View className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center">
							<Ionicons name="person" size={32} color="white" />
						</View>
						<View className="ml-4 flex-1">
							<Text className="text-lg font-semibold text-gray-900">John Doe</Text>
							<Text className="text-gray-600">john.doe@email.com</Text>
						</View>
						<TouchableOpacity>
							<Ionicons name="chevron-forward" size={20} color="#6B7280" />
						</TouchableOpacity>
					</View>
				</View>

				{/* Settings List */}
				<View className="bg-white rounded-lg border border-gray-200">
					{settingsItems.map((item, index) => (
						<TouchableOpacity
							key={item.title}
							className={`p-4 flex-row items-center ${index !== settingsItems.length - 1 ? "border-b border-gray-100" : ""}`}
						>
							<View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
								<Ionicons name={item.icon as any} size={20} color="#6B7280" />
							</View>
							<View className="ml-3 flex-1">
								<Text className="font-medium text-gray-900">{item.title}</Text>
								<Text className="text-sm text-gray-600">{item.subtitle}</Text>
							</View>
							<Ionicons name="chevron-forward" size={16} color="#6B7280" />
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</View>
	);
}

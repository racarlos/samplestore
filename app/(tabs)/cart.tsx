import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Cart() {
	return (
		<View className="flex-1 bg-gray-50">
			{/* Header */}
			<View className="bg-white pt-12 pb-4 px-4 border-b border-gray-200">
				<Text className="text-2xl font-bold text-gray-900">Shopping Cart</Text>
			</View>

			<ScrollView className="flex-1 px-4 py-4">
				{/* Cart Items */}
				<View className="space-y-4">
					{[1, 2].map((item) => (
						<View key={item} className="bg-white p-4 rounded-lg border border-gray-200">
							<View className="flex-row justify-between items-start">
								<View className="flex-1">
									<View className="w-16 h-16 bg-gray-200 rounded-lg mb-2"></View>
									<Text className="font-medium text-gray-900">Product {item}</Text>
									<Text className="text-gray-600">Color: Blue, Size: M</Text>
									<Text className="text-blue-600 font-bold">$99.99</Text>
								</View>
								<View className="flex-row items-center ml-4">
									<TouchableOpacity className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center">
										<Text className="text-gray-600 font-bold">-</Text>
									</TouchableOpacity>
									<Text className="mx-3 font-medium">1</Text>
									<TouchableOpacity className="w-8 h-8 bg-blue-600 rounded-full items-center justify-center">
										<Text className="text-white font-bold">+</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					))}
				</View>

				{/* Empty state when no items */}
				{/* <View className="flex-1 items-center justify-center py-16">
					<Text className="text-gray-500 text-lg">Your cart is empty</Text>
					<Text className="text-gray-400 mt-2">Add some products to get started</Text>
				</View> */}
			</ScrollView>

			{/* Cart Summary */}
			<View className="bg-white p-4 border-t border-gray-200">
				<View className="flex-row justify-between items-center mb-4">
					<Text className="text-lg font-semibold text-gray-900">Total</Text>
					<Text className="text-xl font-bold text-blue-600">$199.98</Text>
				</View>
				<TouchableOpacity className="bg-blue-600 py-4 rounded-lg">
					<Text className="text-white text-center font-semibold text-lg">Checkout</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

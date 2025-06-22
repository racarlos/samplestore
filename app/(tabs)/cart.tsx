import { useCart } from "@/hooks/useCart";
import { router } from "expo-router";
import React, { useMemo } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Cart() {
	const { cart, removeFromCart, updateQuantity, clearCart, isLoading: isCartLoading } = useCart();

	// If cart is empty, show empty state
	const isCartEmpty = cart.items.length === 0;
	const totalPrice = useMemo(
		() => cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
		[cart.items],
	);

	console.log("Cart: ", JSON.stringify(cart, null, 2));

	return (
		<View className="flex-1 bg-gray-50">
			{/* Header */}
			<View className="bg-white pt-12 pb-4 px-4 border-b border-gray-200">
				<Text className="text-2xl font-bold text-gray-900">Shopping Cart</Text>
			</View>

			{isCartLoading ? (
				<View className="flex-1 items-center justify-center">
					<Text className="text-gray-500">Loading cart...</Text>
				</View>
			) : (
				<>
					<ScrollView className="flex-1 px-4 py-4">
						{/* Cart Items */}
						{!isCartEmpty ? (
							<View className="space-y-4">
								{cart.items.map((item) => (
									<View key={item.product.id} className="bg-white p-4 rounded-lg border border-gray-200">
										<View className="flex-row justify-between items-start">
											<View className="flex-1">
												<Image source={{ uri: item.product.image }} className="w-16 h-16 rounded-lg mb-2" />
												<Text className="font-medium text-gray-900">{item.product.productName}</Text>
												<Text className="text-blue-600 font-bold">${item.product.price}</Text>
											</View>
											<View className="flex-row items-center ml-4">
												<TouchableOpacity
													className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
													onPress={() => {
														if (item.quantity === 1) {
															removeFromCart(item.product.id);
														} else {
															updateQuantity(item.product.id, item.quantity - 1);
														}
													}}
												>
													<Text className="text-gray-600 font-bold">-</Text>
												</TouchableOpacity>
												<Text className="mx-3 font-medium">{item.quantity}</Text>
												<TouchableOpacity
													className="w-8 h-8 bg-blue-600 rounded-full items-center justify-center"
													onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
												>
													<Text className="text-white font-bold">+</Text>
												</TouchableOpacity>
											</View>
										</View>
									</View>
								))}
							</View>
						) : (
							<View className="flex-1 items-center justify-center py-16">
								<Text className="text-gray-500 text-lg">Your cart is empty</Text>
								<Text className="text-gray-400 mt-2">Add some products to get started</Text>
								<TouchableOpacity className="mt-6 bg-blue-600 py-3 px-6 rounded-lg" onPress={() => router.push("/")}>
									<Text className="text-white font-medium">Browse Products</Text>
								</TouchableOpacity>
							</View>
						)}
					</ScrollView>

					{/* Cart Summary */}
					{!isCartEmpty && (
						<View className="bg-white p-4 border-t border-gray-200">
							<View className="flex-row justify-between items-center mb-4">
								<Text className="text-lg font-semibold text-gray-900">Total</Text>
								<Text className="text-xl font-bold text-blue-600">${cart.total.toFixed(2)}</Text>
							</View>
							<View className="flex-row gap-2">
								<TouchableOpacity className="flex-1 bg-gray-200 py-4 rounded-lg" onPress={clearCart}>
									<Text className="text-gray-800 text-center font-semibold">Clear Cart</Text>
								</TouchableOpacity>
								<TouchableOpacity className="flex-1 bg-blue-600 py-4 rounded-lg">
									<Text className="text-white text-center font-semibold text-lg">Checkout</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</>
			)}
		</View>
	);
}

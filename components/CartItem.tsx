import { CartItem as CartItemType } from "@/data/interfaces";
import { useCartContext } from "@/providers/CartProvider";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CartItemProps {
	item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
	const { removeFromCart, updateQuantity } = useCartContext();

	return (
		<View className="bg-white p-2 rounded-lg border border-gray-200">
			<View className="flex-row gap-4">
				{/* Image */}
				<View className="w-28 h-28">
					<Image source={{ uri: item.product.image }} className="w-full h-full rounded-lg" />
				</View>

				<View className="flex-col flex-1 justify-center gap-2">
					{/* Name */}
					<Text className="font-semibold text-gray-900">{item.product.productName}</Text>

					<View className="flex-row justify-between items-center mt-2">
						{/* Price and Stock */}
						<View className="flex-col">
							<Text className="text-blue-600 font-bold">${(item.product.price * item.quantity).toFixed(2)}</Text>
							<Text className="text-gray-600">{item.product.stock} in stock</Text>
						</View>

						{/* Quantity Controls */}
						<View className="flex-row items-center">
							{/* Decrement Quantity */}
							<TouchableOpacity
								className="w-8 h-8 bg-blue-600 rounded-full items-center justify-center"
								onPress={() => {
									if (item.quantity === 1) {
										removeFromCart(item.product.id);
									} else {
										updateQuantity(item.product.id, item.quantity - 1);
									}
								}}
							>
								<Text className="text-white font-bold">-</Text>
							</TouchableOpacity>
							<Text className="mx-3 font-medium text-gray-900">{item.quantity}</Text>

							{/* Increment Quantity */}
							<TouchableOpacity
								className={`w-8 h-8 bg-blue-600 rounded-full items-center justify-center ${
									item.product.stock <= item.quantity ? "bg-gray-400" : ""
								}`}
								onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
								disabled={item.product.stock <= item.quantity}
							>
								<Text className="text-white font-bold">+</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}

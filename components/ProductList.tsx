import { Product } from "@/data/interfaces";
import { useCartContext } from "@/providers/CartProvider";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProductListProps {
	products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
	const { cart, addToCart, removeFromCart, updateQuantity } = useCartContext();

	return (
		<View className="flex-row flex-wrap justify-between gap-2">
			{products.map((product) => {
				const cartQuantity = cart.items.find((item) => item.product.id === product.id)?.quantity || 0;
				return (
					<View key={product.id} className="w-[48%] bg-white p-3 rounded-lg border border-gray-200 mb-2">
						<View>
							<Image source={{ uri: product.image }} className="h-36 rounded-lg mb-2" />

							<Text numberOfLines={1} className="text-gray-900 font-medium">
								{product.productName}
							</Text>
							<Text className="text-gray-900 font-bold text-lg">${product.price}</Text>
						</View>

						<Text className="text-gray-600 mb-2">{product.stock} in stock</Text>

						{/* Cart Controls */}
						{cartQuantity === 0 ? (
							<TouchableOpacity className="bg-blue-600 py-2 rounded-lg mt-2" onPress={() => addToCart(product)}>
								<Text className="text-white text-center font-medium">Add to Cart</Text>
							</TouchableOpacity>
						) : (
							<View className="flex-row items-center justify-between mt-2 bg-gray-100 rounded-lg p-1">
								<TouchableOpacity
									className="w-8 h-8 bg-blue-600 rounded-full items-center justify-center"
									onPress={() => {
										if (cartQuantity === 1) {
											removeFromCart(product.id);
										} else {
											updateQuantity(product.id, cartQuantity - 1);
										}
									}}
								>
									<Text className="text-white font-bold">-</Text>
								</TouchableOpacity>

								<Text className="font-medium text-gray-900">{cartQuantity}</Text>

								<TouchableOpacity
									className={`w-8 h-8 bg-blue-600 rounded-full items-center justify-center ${
										product.stock <= cartQuantity ? "bg-gray-400" : ""
									}`}
									onPress={() => updateQuantity(product.id, cartQuantity + 1)}
									disabled={product.stock <= cartQuantity}
								>
									<Text className="text-white font-bold">+</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
				);
			})}
		</View>
	);
}

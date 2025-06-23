import { useProducts } from "@/hooks/useProducts";
import { useCartContext } from "@/providers/CartProvider";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Store() {
	const [search, setSearch] = useState("");
	const { products, isLoading: isProductsLoading } = useProducts();
	const { cart, addToCart, removeFromCart, updateQuantity } = useCartContext();

	// Filter by search term
	const filteredProducts = products.filter((product) =>
		product.productName.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<View className="flex-1 bg-gray-50">
			{/* Header */}
			<View className="bg-white p-4 border-b border-gray-200">
				<Text className="text-2xl font-bold text-gray-900">Sample Store</Text>
				<Text className="text-gray-600 mt-1">Not so amazing products at not so great prices</Text>
			</View>

			<ScrollView className="flex-1 px-4">
				{/* Search Bar Placeholder */}
				<View className="my-2 px-2 bg-white rounded-lg border border-gray-200">
					<TextInput
						placeholder="Search products..."
						value={search}
						onChangeText={setSearch}
						className="text-gray-500"
					/>
				</View>

				{/* Products List */}
				<View className="mb-6">
					<Text className="text-lg font-semibold text-gray-900 mb-3">All Products</Text>
					{isProductsLoading ? (
						<Text className="text-gray-500">Loading products...</Text>
					) : (
						<View className="flex-row h-full flex-wrap justify-between gap-2">
							{filteredProducts.map((product) => {
								const cartQuantity = cart.items.find((item) => item.product.id === product.id)?.quantity || 0;
								return (
									<View key={product.id} className="w-[48%] bg-white p-3 rounded-lg border border-gray-200 mb-2">
										<View>
											<Image source={{ uri: product.image }} className="h-36 rounded-lg mb-2" />

											<Text numberOfLines={1} className="text-gray-900 font-medium">
												{product.productName}
											</Text>
											<Text className="text-blue-600 font-bold text-lg">₱{product.price}</Text>
										</View>

										<Text className="text-gray-600">{product.stock} in stock</Text>

										{/* Cart Controls */}
										{cartQuantity === 0 ? (
											<TouchableOpacity className="bg-blue-600 py-2 rounded-lg mt-2" onPress={() => addToCart(product)}>
												<Text className="text-white text-center font-medium">Add to Cart</Text>
											</TouchableOpacity>
										) : (
											<View className="flex-row items-center justify-between mt-1 bg-gray-100 rounded-lg p-1">
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
					)}
				</View>
			</ScrollView>
		</View>
	);
}

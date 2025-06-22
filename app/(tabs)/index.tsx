import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Store() {
	const [search, setSearch] = useState("");
	const { products, isLoading: isProductsLoading } = useProducts();
	const { addToCart, updateQuantity, removeFromCart, cart } = useCart();

	const filteredProducts = products.filter((product) =>
		product.productName.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<View className="flex-1 bg-gray-50 relative">
			{/* Header */}
			<View className="bg-white pt-12 pb-4 px-4 border-b border-gray-200">
				<Text className="text-2xl font-bold text-gray-900">Sample Store</Text>
				<Text className="text-gray-600 mt-1">Discover amazing products</Text>
			</View>

			<ScrollView className="flex-1 px-4">
				{/* Search Bar Placeholder */}
				<View className="my-4 p-3 bg-white rounded-lg border border-gray-200">
					<TextInput
						placeholder="Search products..."
						value={search}
						onChangeText={setSearch}
						className="text-gray-500"
					/>
				</View>

				{/* Categories */}
				<View className="mb-6">
					<Text className="text-lg font-semibold text-gray-900 mb-3">Categories</Text>
					<ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
						{["Electronics", "Clothing", "Books", "Home"].map((category) => (
							<TouchableOpacity key={category} className="bg-blue-100 px-4 py-2 rounded-full mr-2">
								<Text className="text-blue-800 font-medium">{category}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

				{/* Products Grid - Move to its own component ProductList.tsx */}
				<View className="mb-6">
					<Text className="text-lg font-semibold text-gray-900 mb-3">All Products</Text>
					{isProductsLoading ? (
						<Text className="text-gray-500">Loading products...</Text>
					) : (
						<View className="flex-row flex-wrap justify-between gap-2">
							{filteredProducts.map((product) => {
								const cartQuantity = cart.items.find((item) => item.id === product.id)?.quantity || 0;
								return (
									<View key={product.id} className="w-[48%] bg-white p-3 rounded-lg border border-gray-200 mb-4">
										<Link href={`/product/${product.id}`} asChild>
											<TouchableOpacity>
												<Image source={{ uri: product.image }} className="h-36 rounded-lg mb-2" />

												<Text numberOfLines={1} className="text-gray-900 font-medium">
													{product.productName}
												</Text>
												<Text className="text-gray-900 font-bold text-lg">${product.price}</Text>
											</TouchableOpacity>
										</Link>

										<Text className="text-gray-600 mb-2">{product.quantity} in stock</Text>

										{/* Cart Controls */}
										{cartQuantity === 0 ? (
											<TouchableOpacity className="bg-blue-600 py-2 rounded-lg mt-2" onPress={() => addToCart(product)}>
												<Text className="text-white text-center font-medium">Add to Cart</Text>
											</TouchableOpacity>
										) : (
											<View className="flex-row items-center justify-between mt-2 bg-gray-100 rounded-lg p-1">
												<TouchableOpacity
													className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
													onPress={() => {
														if (cartQuantity === 1) {
															removeFromCart(product.id);
														} else {
															updateQuantity(product.id, cartQuantity - 1);
														}
													}}
												>
													<Text className="text-gray-600 font-bold">-</Text>
												</TouchableOpacity>

												<Text className="font-medium text-gray-900">{cartQuantity}</Text>

												<TouchableOpacity
													className="w-8 h-8 bg-blue-600 rounded-full items-center justify-center"
													onPress={() => updateQuantity(product.id, cartQuantity + 1)}
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

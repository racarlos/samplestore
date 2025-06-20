import ProductCard from "@/components/ProductCard";
import { SEED_PRODUCTS } from "@/data/products";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Store() {
	const products = SEED_PRODUCTS;
	const [search, setSearch] = useState("");

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

				{/* Products Grid */}
				<View className="mb-6">
					<Text className="text-lg font-semibold text-gray-900 mb-3">All Products</Text>
					<View className="flex-row flex-wrap justify-between">
						{filteredProducts.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

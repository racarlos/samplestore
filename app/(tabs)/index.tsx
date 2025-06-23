import ProductList from "@/components/ProductList";
import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

export default function Store() {
	const [search, setSearch] = useState("");
	const { products, isLoading: isProductsLoading } = useProducts();

	// Filter by search term
	const filteredProducts = products.filter((product) =>
		product.productName.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<View className="flex-1 bg-gray-50 relative">
			{/* Header */}
			<View className="bg-white p-4 border-b border-gray-200">
				<Text className="text-2xl font-bold text-gray-900">Sample Store</Text>
				<Text className="text-gray-600 mt-1">Not so amazing products at not so great prices</Text>
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

				{/* Products List */}
				<View className="mb-6">
					<Text className="text-lg font-semibold text-gray-900 mb-3">All Products</Text>
					{isProductsLoading ? (
						<Text className="text-gray-500">Loading products...</Text>
					) : (
						<ProductList products={filteredProducts} />
					)}
				</View>
			</ScrollView>
		</View>
	);
}

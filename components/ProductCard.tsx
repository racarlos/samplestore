import { Product } from "@/data/interfaces";
import { useCart } from "@/hooks/useCart";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

type ProductCardProps = {
	product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
	const { addToCart, updateQuantity, removeFromCart, cart } = useCart();

	// Check if product is in cart and get quantity
	const getCartItemQuantity = (productId: string) => {
		const cartItem = cart.items.find((item) => item.id === productId);
		return cartItem ? cartItem.quantity : 0;
	};

	const cartQuantity = getCartItemQuantity(product.id);

	return (
		<View className="w-full bg-white p-3 rounded-lg border border-gray-200 mb-4">
			<Link href={`/product/${product.id}`} asChild>
				<TouchableOpacity>
					<Image source={{ uri: product.image }} style={{ height: 150, borderRadius: 8 }} />
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
}

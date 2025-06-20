import { useCart } from "@/hooks/useCart";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

export default function FloatingCart() {
	const { cart, itemCount } = useCart();
	const scaleAnim = useRef(new Animated.Value(1)).current;

	// Format the total price to 2 decimal places
	const formattedTotal = useMemo(() => {
		return cart.total.toFixed(2);
	}, [cart.total]);

	// Animate the cart when item count changes
	useEffect(() => {
		if (itemCount > 0) {
			Animated.sequence([
				Animated.timing(scaleAnim, {
					toValue: 1.2,
					duration: 200,
					useNativeDriver: true,
				}),
				Animated.timing(scaleAnim, {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}),
			]).start();
		}
	}, [itemCount]);

	// Don't show the floating cart if there are no items
	if (itemCount === 0) {
		return null;
	}

	return (
		<TouchableOpacity
			className="absolute bottom-20 right-5 z-50"
			onPress={() => router.push("/cart")}
			activeOpacity={0.8}
		>
			<Animated.View
				style={{ transform: [{ scale: scaleAnim }] }}
				className="flex-row items-center bg-blue-600 rounded-full py-2.5 px-4 shadow-lg"
			>
				<View className="relative mr-2">
					<Ionicons name="cart" size={24} color="white" />
					<View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
						<Text className="text-white text-xs font-bold">{itemCount}</Text>
					</View>
				</View>
				<View className="pl-1">
					<Text className="text-white font-bold text-base">${formattedTotal}</Text>
				</View>
			</Animated.View>
		</TouchableOpacity>
	);
}

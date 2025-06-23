import CartItem from "@/components/CartItem";
import { Discount } from "@/data/interfaces";
import { useCartContext } from "@/providers/CartProvider";
import { useOrdersContext } from "@/providers/OrdersProvider";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

// Hardcoded discount codes
const DISCOUNT_CODES: Record<string, Discount> = {
	DISCOUNT10: { code: "DISCOUNT10", discount: 10, description: "10% off your order", discountType: "percentage" },
	PROMO100: { code: "PROMO100", discount: 100, description: "₱100 off your order", discountType: "fixed" },
};

export default function Cart() {
	const { cart, clearCart, isLoading: isCartLoading } = useCartContext();
	const { createOrder } = useOrdersContext();

	const [discountCode, setDiscountCode] = useState("");
	const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
	const [discountError, setDiscountError] = useState("");

	// If cart is empty, show empty state
	const isCartEmpty = cart.items.length === 0;

	// Calculate discount amount
	const calculateDiscount = () => {
		if (!appliedDiscount) return 0;

		if (appliedDiscount.discountType === "percentage") {
			return (cart.total * appliedDiscount.discount) / 100;
		} else {
			return Math.min(appliedDiscount.discount, cart.total); // Don't discount more than total
		}
	};

	// Calculate final total
	const discountAmount = calculateDiscount();
	const finalTotal = cart.total - discountAmount;

	// Apply discount function
	const applyDiscount = () => {
		const code = discountCode.trim().toUpperCase();
		setDiscountError("");

		if (!code) {
			setDiscountError("Please enter a discount code");
			return;
		}

		const discount = DISCOUNT_CODES[code as keyof typeof DISCOUNT_CODES];
		if (!discount) {
			setDiscountError("Invalid Code - Try DISCOUNT10 or PROMO100");
			return;
		}

		setAppliedDiscount(DISCOUNT_CODES[discountCode]);
		setDiscountCode("");
	};

	// Remove discount function
	const removeDiscount = () => {
		setAppliedDiscount(null);
		setDiscountError("");
	};

	// Handle discount code input change
	const handleDiscountCodeChange = (text: string) => {
		setDiscountCode(text.toUpperCase().trim());
		setDiscountError("");
	};

	// Handle checkout function
	const handleCheckout = () => {
		if (cart.items.length === 0) {
			Alert.alert("Empty Cart", "Your cart is empty. Please add some items before checking out.");
			return;
		}

		try {
			// Create the order
			const newOrder = createOrder(cart.items, finalTotal, appliedDiscount);

			// Clear the cart
			clearCart();
		} catch (error) {
			console.error("Error creating order:", error);
			return;
		}
	};

	isCartLoading && (
		<View className="flex-1 items-center justify-center">
			<Text className="text-gray-500">Loading cart...</Text>
		</View>
	);

	return (
		<View className="flex-1 bg-gray-50">
			{/* Header */}
			<View className="bg-white p-4 border-b border-gray-200">
				<Text className="text-2xl font-bold text-gray-900">Sample Cart</Text>
				<Text className="text-gray-600 mt-1">Please buy so I can pay my bills</Text>
			</View>

			<>
				<ScrollView className="flex-1 px-4 py-4">
					{isCartEmpty ? (
						<View className="flex-1 items-center justify-center py-20">
							<Text className="text-xl text-gray-500 mb-4">Your cart is empty</Text>
							<TouchableOpacity className="bg-blue-600 px-6 py-3 rounded-lg" onPress={() => router.push("/")}>
								<Text className="text-white font-semibold">Continue Shopping</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View className="space-y-4">
							{cart.items.map((item) => (
								<CartItem key={item.product.id} item={item} />
							))}
						</View>
					)}
				</ScrollView>

				{/* Cart Summary */}
				{!isCartEmpty && (
					<View className="flex-col">
						{/* Discount Section */}
						<View className=" bg-white p-2 m-2 rounded-lg bg-transparent">
							{appliedDiscount ? (
								// When discount is applied
								<View className="bg-green-50 border border-green-200 rounded-lg p-3">
									<View className="flex-row justify-between items-center w-full">
										<View>
											<Text className="text-green-800 font-semibold">{appliedDiscount.code}</Text>
											<Text className="text-green-600 text-sm">{appliedDiscount.description}</Text>
										</View>
										<TouchableOpacity onPress={removeDiscount} className="bg-red-500 px-3 py-1 rounded-lg">
											<Text className="text-white text-sm font-semibold">Remove</Text>
										</TouchableOpacity>
									</View>
								</View>
							) : (
								// Discount Inpit
								<View className="items-center">
									<View className="flex-row gap-2 w-full">
										<TextInput
											className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-900 font-medium"
											value={discountCode}
											onChangeText={handleDiscountCodeChange}
											placeholder="Enter discount code"
											placeholderTextColor="#9CA3AF"
											autoCapitalize="characters"
										/>
										<TouchableOpacity
											onPress={applyDiscount}
											className="bg-blue-600 p-2 rounded-lg items-center justify-center"
											disabled={!discountCode.trim()}
										>
											<Text className="text-white font-semibold">Apply</Text>
										</TouchableOpacity>
									</View>
									<Text className="text-red-500 text-sm">{discountError}</Text>
								</View>
							)}
						</View>

						{/* Order Summary */}
						<View className="bg-white p-4 border-t border-gray-200">
							<Text className="text-lg font-semibold text-gray-900 mb-3">Order Summary</Text>
							<View className="space-y-2 mb-4">
								<View className="flex-row justify-between items-center">
									<Text className="text-gray-600">Subtotal:</Text>
									<Text className="text-gray-900 font-medium">₱{cart.total.toFixed(2)}</Text>
								</View>

								{appliedDiscount && (
									<View className="flex-row justify-between items-center">
										<Text className="text-gray-600">Discount:</Text>
										<Text className="text-green-600 font-medium">-₱{discountAmount.toFixed(2)}</Text>
									</View>
								)}

								<View className="border-t border-gray-200 pt-2">
									<View className="flex-row justify-between items-center">
										<Text className="text-lg font-semibold text-gray-900">Total:</Text>
										<Text className="text-lg font-bold text-blue-600">₱{finalTotal.toFixed(2)}</Text>
									</View>
								</View>
							</View>

							{/* Buttons */}
							<View className="flex-row gap-2">
								<TouchableOpacity className="flex-1 bg-gray-200 py-2 rounded-lg" onPress={clearCart}>
									<Text className="text-gray-800 text-center font-semibold text-sm">Clear Cart</Text>
								</TouchableOpacity>

								<TouchableOpacity className="flex-1 bg-blue-600 py-2 rounded-lg" onPress={handleCheckout}>
									<Text className="text-white text-center font-semibold text-sm">Place Order</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				)}
			</>
		</View>
	);
}

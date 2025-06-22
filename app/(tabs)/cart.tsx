import { Discount } from "@/data/interfaces";
import { useCartContext } from "@/providers/CartProvider";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

// Hardcoded discount codes
const DISCOUNT_CODES: Record<string, Discount> = {
	DISCOUNT10: { code: "DISCOUNT10", discount: 10, description: "10% off your order", discountType: "percentage" },
	PROMO100: { code: "PROMO100", discount: 100, description: "₱100 off your order", discountType: "fixed" },
};

export default function Cart() {
	const { cart, removeFromCart, updateQuantity, clearCart, isLoading: isCartLoading } = useCartContext();

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
		setDiscountCode(text.toUpperCase());
		setDiscountError("");
	};

	isCartLoading && (
		<View className="flex-1 items-center justify-center">
			<Text className="text-gray-500">Loading cart...</Text>
		</View>
	);

	return (
		<View className="flex-1 bg-gray-50">
			{/* Header */}
			<View className="bg-white p-2 border-b border-gray-400">
				<Text className="text-2xl font-bold text-gray-900">Shopping Cart</Text>
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
								<View key={item.product.id} className="bg-white p-2 rounded-lg border border-gray-200">
									<View className="flex-row justify-between items-start h-full gap-4">
										{/* Image */}
										<View className="w-28 h-28">
											<Image source={{ uri: item.product.image }} className="w-full h-full rounded-lg" />
										</View>

										<View className="flex-col flex-1 gap-1 h-full justify-center ">
											<View className="gap-1">
												<Text className="font-semibold  text-gray-900">{item.product.productName}</Text>
												<Text className="text-blue-600 font-bold">
													${(item.product.price * item.quantity).toFixed(2)}
												</Text>
												<Text className="text-gray-600 mb-2">{item.product.stock} in stock</Text>
											</View>

											{/* Quantity Controls */}
											<View className="flex-row items-center rounded-lg w-a">
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

								<TouchableOpacity className="flex-1 bg-blue-600 py-2 rounded-lg">
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

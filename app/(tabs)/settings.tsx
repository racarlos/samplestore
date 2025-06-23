import { DISCOUNT_CODES } from "@/data/seed";
import { useProducts } from "@/hooks/useProducts";
import { useCartContext } from "@/providers/CartProvider";
import { useOrdersContext } from "@/providers/OrdersProvider";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
	const { clearCart } = useCartContext();
	const { resetToSeedData } = useProducts();
	const { orders, clearOrders } = useOrdersContext();

	const [isClearing, setIsClearing] = useState(false);
	const [expandedSections, setExpandedSections] = useState<{
		promos: boolean;
		orderHistory: boolean;
		clearData: boolean;
	}>({
		promos: false,
		orderHistory: false,
		clearData: false,
	});

	const handleClearAllData = async () => {
		setIsClearing(true);
		try {
			// Clear AsyncStorage
			await AsyncStorage.clear();
			console.log("AsyncStorage cleared");

			await clearCart();
			await clearOrders();
			await resetToSeedData();
		} catch (error) {
			console.error("Error clearing data:", error);
		} finally {
			setIsClearing(false);
		}
	};

	const toggleSection = (section: "promos" | "orderHistory" | "clearData") => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	const settingsItems = [
		{
			title: "Promos",
			icon: "pricetag-outline",
			subtitle: "Show available discount codes",
			action: () => toggleSection("promos"),
			loading: false,
		},
		{
			title: "Order History",
			icon: "time-outline",
			subtitle: "View past orders",
			action: () => toggleSection("orderHistory"),
			loading: false,
		},
		{
			title: "Clear All Data",
			icon: "trash-outline",
			subtitle: "Delete all app data",
			action: () => toggleSection("clearData"),
			color: "red",
			expandable: true,
			loading: isClearing,
		},
	];

	return (
		<View className="flex-1 bg-gray-50">
			{/* Header */}
			<View className="bg-white pt-12 pb-4 px-4 border-b border-gray-200">
				<Text className="text-2xl font-bold text-gray-900">Settings</Text>
			</View>

			<ScrollView className="flex-1 px-4 py-4">
				{/* User Profile Section */}
				<View className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
					<View className="flex-row items-center">
						<View className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center">
							<Ionicons name="person" size={32} color="white" />
						</View>
						<View className="ml-4 flex-1">
							<Text className="text-lg font-semibold text-gray-900">John Doe</Text>
							<Text className="text-gray-600">john.doe@email.com</Text>
						</View>
						<TouchableOpacity>
							<Ionicons name="chevron-forward" size={20} color="#6B7280" />
						</TouchableOpacity>
					</View>
				</View>

				{/* Settings List */}
				<View className="bg-white rounded-lg border border-gray-200">
					{settingsItems.map((item, index) => (
						<View key={item.title}>
							<TouchableOpacity
								className={`p-4 flex-row items-center ${index !== settingsItems.length - 1 ? "border-b border-gray-100" : ""}`}
								onPress={item.action}
								disabled={item.loading}
							>
								<View className={`w-10 h-10 bg-gray-100 rounded-full items-center justify-center`}>
									{item.loading ? (
										<Ionicons name="refresh" size={20} color="#6B7280" />
									) : (
										<Ionicons name={item.icon as any} size={20} color="#6B7280" />
									)}
								</View>
								<View className="ml-3 flex-1">
									<Text className="font-medium text-gray-900">{item.title}</Text>
									<Text className="text-sm text-gray-600">{item.subtitle}</Text>
								</View>
								{item.expandable ? (
									<Ionicons
										name={
											(item.title === "Promos" && expandedSections.promos) ||
											(item.title === "Order History" && expandedSections.orderHistory) ||
											(item.title === "Clear All Data" && expandedSections.clearData)
												? "chevron-down"
												: "chevron-forward"
										}
										size={16}
										color="#6B7280"
									/>
								) : (
									<Ionicons name="chevron-forward" size={16} color="#6B7280" />
								)}
							</TouchableOpacity>

							{/* Expandable Content for Promos */}
							{item.title === "Promos" && expandedSections.promos && (
								<View className="bg-gray-50 border-t border-gray-100">
									<View className="p-4">
										<Text className="text-sm font-semibold text-gray-700 mb-3">Available Discount Codes</Text>
										{DISCOUNT_CODES.map((discount, idx) => (
											<View
												key={discount.code}
												className={`bg-white p-3 rounded-lg border border-gray-200 ${idx > 0 ? "mt-2" : ""}`}
											>
												<View className="flex-row justify-between items-start">
													<View className="flex-1">
														<Text className="font-semibold text-green-600">{discount.code}</Text>
														<Text className="text-sm text-gray-600 mt-1">{discount.description}</Text>
														<Text className="text-xs text-gray-500 mt-1">
															Type: {discount.discountType === "percentage" ? "Percentage" : "Fixed Amount"}
														</Text>
													</View>
													<View className="bg-green-100 px-2 py-1 rounded">
														<Text className="text-xs font-semibold text-green-800">
															{discount.discountType === "percentage"
																? `${discount.discount}%`
																: `₱${discount.discount}`}
														</Text>
													</View>
												</View>
											</View>
										))}
									</View>
								</View>
							)}

							{/* Expandable Content for Order History */}
							{item.title === "Order History" && expandedSections.orderHistory && (
								<View className="bg-gray-50 border-t border-gray-100">
									<View className="p-4">
										<Text className="text-sm font-semibold text-gray-700 mb-3">Recent Orders</Text>
										{orders.length === 0 ? (
											<View className="bg-white p-4 rounded-lg border border-gray-200">
												<Text className="text-gray-500 text-center">No orders yet</Text>
											</View>
										) : (
											orders.map((order, idx) => {
												const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0);
												return (
													<View
														key={order.id}
														className={`bg-white p-3 rounded-lg border border-gray-200 ${idx > 0 ? "mt-2" : ""}`}
													>
														<View className="flex-row justify-between items-start">
															<View className="flex-1">
																<Text className="font-semibold text-gray-900">{order.id}</Text>
																<Text className="text-sm text-gray-600 mt-1">
																	{new Date(order.dateCreated).toLocaleDateString()} • {totalItems || "N/A"} items
																</Text>
																<View className="flex-row items-center mt-1">
																	<View
																		className={`px-2 py-1 rounded-full ${
																			order.status === "Delivered"
																				? "bg-green-100"
																				: order.status === "Cancelled"
																					? "bg-red-100"
																					: "bg-yellow-100"
																		}`}
																	>
																		<Text
																			className={`text-xs font-semibold ${
																				order.status === "Delivered"
																					? "text-green-800"
																					: order.status === "Cancelled"
																						? "text-red-800"
																						: "text-yellow-800"
																			}`}
																		>
																			{order.status}
																		</Text>
																	</View>
																</View>
																{order.discount && (
																	<Text className="text-xs text-green-600 mt-1">
																		Discount applied: {order.discount.code}
																	</Text>
																)}
															</View>
															<Text className="font-bold text-gray-900">₱{order.total.toFixed(2)}</Text>
														</View>
													</View>
												);
											})
										)}
									</View>
								</View>
							)}

							{/* Expandable Content for Clear All Data */}
							{item.title === "Clear All Data" && expandedSections.clearData && (
								<View className="">
									<View className="p-4">
										<View className="bg-red-100 border border-red-200 rounded-lg p-4 mb-4">
											<View className="flex-row items-start">
												<Ionicons name="warning" size={20} color="#DC2626" style={{ marginTop: 2, marginRight: 8 }} />
												<View className="flex-1">
													<Text className="text-red-800 font-semibold mb-2">Warning</Text>
													<Text className="text-red-700 text-sm leading-5">
														This action will clear async storage. Used for debugging
													</Text>
													<Text className="text-red-700 text-sm leading-5 mt-1">• Shopping cart items</Text>
													<Text className="text-red-700 text-sm leading-5">• Products List</Text>
													<Text className="text-red-700 text-sm font-semibold mt-2">This action cannot be undone.</Text>
												</View>
											</View>
										</View>

										<TouchableOpacity
											className={`w-full py-3 px-4 rounded-lg items-center justify-center ${
												isClearing ? "bg-gray-400" : "bg-red-600"
											}`}
											onPress={handleClearAllData}
											disabled={isClearing}
										>
											{isClearing ? (
												<View className="flex-row items-center">
													<Ionicons name="refresh" size={16} color="white" style={{ marginRight: 8 }} />
													<Text className="text-white font-semibold">Clearing Data...</Text>
												</View>
											) : (
												<View className="flex-row items-center">
													<Ionicons name="trash" size={16} color="white" style={{ marginRight: 8 }} />
													<Text className="text-white font-semibold">Clear All Data</Text>
												</View>
											)}
										</TouchableOpacity>
									</View>
								</View>
							)}
						</View>
					))}
				</View>
			</ScrollView>
		</View>
	);
}

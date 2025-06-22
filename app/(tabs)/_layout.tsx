import { useCartContext } from "@/providers/CartProvider";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
export default function TabLayout() {
	const { cart } = useCartContext();

	const totalCartQuantity = useMemo(() => cart.items.reduce((acc, item) => acc + item.quantity, 0), [cart.items]);

	return (
		<>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: "#3B82F6",
					tabBarInactiveTintColor: "#6B7280",
					headerShown: false,
					tabBarStyle: {
						backgroundColor: "white",
						borderTopWidth: 1,
						borderTopColor: "#E5E7EB",
					},
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Store",
						tabBarIcon: ({ color, size }) => <Ionicons name="storefront-outline" size={size} color={color} />,
					}}
				/>
				<Tabs.Screen
					name="cart"
					options={{
						title: "Cart",
						tabBarIcon: ({ color, size }) => (
							<View className="relative">
								<Ionicons name="bag-outline" size={size} color={color} />
								{cart.items.length > 0 && (
									<View className="absolute -top-1.5 -right-2.5 bg-red-500 rounded-full w-[18px] h-[18px] items-center justify-center">
										<Text className="text-white text-[10px] font-bold">{totalCartQuantity}</Text>
									</View>
								)}
							</View>
						),
					}}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						title: "Settings",
						tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
					}}
				/>
			</Tabs>
		</>
	);
}

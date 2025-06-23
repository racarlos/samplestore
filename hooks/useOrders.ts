import { Order } from "@/data/interfaces";
import { SEED_ORDERS } from "@/data/seed";
import { faker } from "@faker-js/faker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export function useOrders() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Load orders from AsyncStorage on mount
	useEffect(() => {
		const loadOrders = async () => {
			try {
				const storedOrders = await AsyncStorage.getItem("orders");
				if (storedOrders) {
					const parsedOrders = JSON.parse(storedOrders);
					if (parsedOrders.length > 0) {
						setOrders(parsedOrders);
					} else {
						// Use dummy orders if no real orders found
						setOrders(SEED_ORDERS);
					}
				} else {
					// Use dummy orders if no orders in AsyncStorage
					setOrders(SEED_ORDERS);
				}
			} catch (error) {
				console.error("Error loading orders from AsyncStorage:", error);
				// Use dummy orders as fallback
				setOrders(SEED_ORDERS);
			} finally {
				setIsLoading(false);
			}
		};

		loadOrders();
	}, []);

	// Save orders to AsyncStorage when they change
	useEffect(() => {
		const saveOrders = async () => {
			try {
				await AsyncStorage.setItem("orders", JSON.stringify(orders));
			} catch (error) {
				console.error("Error saving orders to AsyncStorage:", error);
			}
		};

		if (!isLoading) {
			saveOrders();
		}
	}, [orders, isLoading]);

	const createOrder = useCallback(
		(cartItems: any[], total: number, discount: any = null) => {
			const newOrder: Order = {
				id: faker.string.uuid(),
				items: cartItems,
				total: total,
				discount: discount,
				dateCreated: Date.now(),
				status: "Processing",
			};

			setOrders((prevOrders) => [newOrder, ...prevOrders]);
			return newOrder;
		},
		[orders.length],
	);

	const clearOrders = useCallback(async () => {
		try {
			await AsyncStorage.removeItem("orders");
			setOrders([]);
		} catch (error) {
			console.error("Error clearing orders from AsyncStorage:", error);
		}
	}, []);

	return {
		orders,
		isLoading,
		createOrder,
		clearOrders,
	};
}

import { Cart, Product } from "@/data/interfaces";
import { toFixed } from "@/utils/math-utilts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";

// Initial empty cart
const initialCart: Cart = {
	items: [],
	total: 0,
};

export function useCart() {
	// Local state for cart
	const [cart, setCart] = useState<Cart>(initialCart);
	const [isLoading, setIsLoading] = useState(true);
	const [isInitialized, setIsInitialized] = useState(false);

	const itemCount = useMemo(() => cart.items.reduce((count, item) => count + item.quantity, 0), [cart.items]);

	console.log("Cart Item Count: ", itemCount);

	// Connect to AsyncStorage
	// const {
	// 	storedValue: storedCart,
	// 	setValue: setStoredCart,
	// 	isLoading: isStorageLoading,
	// } = useAsyncStorage<Cart>("cart", initialCart);

	// Load cart from AsyncStorage on mount
	useEffect(() => {
		const loadCart = async () => {
			try {
				console.log("Loading cart from AsyncStorage");
				const item = await AsyncStorage.getItem("cart");

				if (item) {
					const value = JSON.parse(item);
					setCart(value);
				} else {
					setCart(initialCart);
				}
			} catch (error) {
				console.error("Error loading cart from AsyncStorage:", error);
				setCart(initialCart);
			} finally {
				setIsLoading(false);
				setIsInitialized(true);
			}
		};

		loadCart();
	}, []);

	// Save cart to AsyncStorage when it changes (but not during initial load)
	useEffect(() => {
		if (!isInitialized) {
			return; // Don't save during initial load
		}

		const saveCart = async () => {
			try {
				console.log("Saving cart to AsyncStorage", cart);
				await AsyncStorage.setItem("cart", JSON.stringify(cart));
			} catch (error) {
				console.error("Error saving cart to AsyncStorage:", error);
			}
		};

		saveCart();
	}, [cart, isInitialized]);

	const calculateTotal = (items: any[]) => {
		return toFixed(items.reduce((sum, item) => sum + item.product.price * item.quantity, 0));
	};

	const addToCart = useCallback((product: Product, quantity: number = 1) => {
		setCart((currentCart) => {
			const existingItemIndex = currentCart.items.findIndex((item) => item.product.id === product.id);

			let updatedItems;

			if (existingItemIndex !== -1) {
				updatedItems = currentCart.items.map((item, index) =>
					index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item,
				);
			} else {
				updatedItems = [...currentCart.items, { product, quantity }];
			}

			const newTotal = calculateTotal(updatedItems);
			return { items: updatedItems, total: newTotal };
		});
	}, []);

	const removeFromCart = useCallback((productId: string) => {
		setCart((currentCart) => {
			const updatedItems = currentCart.items.filter((item) => item.product.id !== productId);
			const newTotal = calculateTotal(updatedItems);
			return { items: updatedItems, total: newTotal };
		});
	}, []);

	const updateQuantity = useCallback((productId: string, quantity: number) => {
		setCart((currentCart) => {
			if (quantity <= 0) {
				// Inline the remove logic instead of calling removeFromCart
				const updatedItems = currentCart.items.filter((item) => item.product.id !== productId);
				const newTotal = calculateTotal(updatedItems);
				return { items: updatedItems, total: newTotal };
			}

			const updatedItems = currentCart.items.map((item) =>
				item.product.id === productId ? { ...item, quantity } : item,
			);
			const newTotal = calculateTotal(updatedItems);
			return { items: updatedItems, total: newTotal };
		});
	}, []);

	const clearCart = async () => {
		try {
			await AsyncStorage.removeItem("cart");
			setCart(initialCart);
		} catch (error) {
			console.error("Error clearing cart from AsyncStorage:", error);
		}
	};

	return {
		cart,
		isLoading: isLoading,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		itemCount,
	};
}

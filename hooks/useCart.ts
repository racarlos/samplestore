import { Cart, Product } from "@/data/interfaces";
import { toFixed } from "@/utils/math-utilts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";

// Initial empty cart
const initialCart: Cart = {
	items: [],
	total: 0,
};

export function useCart() {
	// Local state for cart
	const [cart, setCart] = useState<Cart>(initialCart);
	const [isLoading, setIsLoading] = useState(true);

	const itemCount = useMemo(() => cart.items.reduce((count, item) => count + item.quantity, 0), [cart.items]);

	console.log("Cart Item Count: ", itemCount);

	// Connect to AsyncStorage
	// const {
	// 	storedValue: storedCart,
	// 	setValue: setStoredCart,
	// 	isLoading: isStorageLoading,
	// } = useAsyncStorage<Cart>("cart", initialCart);

	// Load cart from AsyncStorage on initial render
	useEffect(() => {
		const loadCart = async () => {
			try {
				console.log("Loading cart from AsyncStorage");
				setIsLoading(true);
				const item = await AsyncStorage.getItem("cart");

				if (item) {
					const value = JSON.parse(item);
					setCart(value);
				} else {
					setCart(initialCart);
				}
			} catch (error) {
				console.error("Error loading cart from AsyncStorage:", error);
			} finally {
				setIsLoading(false);
			}
		};

		loadCart();
	}, []);

	// Whenever the cart changes, save it to AsyncStorage
	useEffect(() => {
		const saveCart = async () => {
			try {
				setIsLoading(true);
				console.log("Saving cart to AsyncStorage");
				await AsyncStorage.setItem("cart", JSON.stringify(cart));
			} catch (error) {
				console.error("Error saving cart to AsyncStorage:", error);
			} finally {
				setIsLoading(false);
			}
		};

		saveCart();
	}, [cart]);

	// Add item to cart
	const addToCart = (product: Product, quantity: number = 1) => {
		try {
			setIsLoading(true);

			// Compute the new total
			const newTotal = cart.items.reduce((sum, item) => sum + toFixed(item.product.price * item.quantity), 0);
			// Append the new item to the cart
			const updatedCart = { items: [...cart.items, { product, quantity }], total: newTotal };
			setCart(updatedCart);
		} catch (error) {
			console.error("Error adding item to cart:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Remove item from cart
	const removeFromCart = (productId: string) => {
		try {
			setIsLoading(true);
			const updatedItems = cart.items.filter((item) => item.product.id !== productId);
			const newTotal = updatedItems.reduce((sum, item) => sum + toFixed(item.product.price * item.quantity), 0);
			const updatedCart = { ...cart, items: updatedItems, total: newTotal };
			setCart(updatedCart);
		} catch (error) {
			console.error("Error removing item from cart:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Update item quantity
	const updateQuantity = (productId: string, quantity: number) => {
		try {
			setIsLoading(true);
			if (quantity <= 0) {
				removeFromCart(productId);
				return;
			}

			const updatedItems = cart.items.map((item) => (item.product.id === productId ? { ...item, quantity } : item));
			const newTotal = updatedItems.reduce((sum, item) => sum + toFixed(item.product.price * item.quantity), 0);
			const updatedCart = { ...cart, items: updatedItems, total: newTotal };
			setCart(updatedCart);
		} catch (error) {
			console.error("Error updating item quantity:", error);
		} finally {
			setIsLoading(false);
		}
	};

	// Clear the entire cart
	const clearCart = () => {
		setIsLoading(true);
		setCart(initialCart);
		setIsLoading(false);
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

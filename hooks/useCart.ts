import { useEffect } from "react";
import { Cart, Product } from "../data/interfaces";
import { useAsyncStorage } from "./useAsyncStorage";

// Initial empty cart
const initialCart: Cart = {
	items: [],
	total: 0,
};

export function useCart() {
	// Use AsyncStorage to persist cart data
	const { storedValue: cart, setValue: setCart, isLoading } = useAsyncStorage<Cart>("cart", initialCart);

	// Calculate cart total whenever items change
	useEffect(() => {
		if (!isLoading && cart.items.length > 0) {
			const newTotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
			if (newTotal !== cart.total) {
				setCart({ ...cart, total: newTotal });
			}
		}
	}, [cart.items, isLoading]);

	// Add item to cart
	const addToCart = (product: Product, quantity: number = 1) => {
		const existingItemIndex = cart.items.findIndex((item) => item.id === product.id);

		if (existingItemIndex !== -1) {
			// Item already exists, update quantity
			const updatedItems = [...cart.items];
			updatedItems[existingItemIndex] = {
				...updatedItems[existingItemIndex],
				quantity: updatedItems[existingItemIndex].quantity + quantity,
			};

			setCart({ ...cart, items: updatedItems });
		} else {
			// New item, add to cart
			const newItem = { ...product, quantity };
			setCart({ ...cart, items: [...cart.items, newItem] });
		}
	};

	// Remove item from cart
	const removeFromCart = (productId: string) => {
		const updatedItems = cart.items.filter((item) => item.id !== productId);
		setCart({ ...cart, items: updatedItems });
	};

	// Update item quantity
	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}

		const updatedItems = cart.items.map((item) => (item.id === productId ? { ...item, quantity } : item));

		setCart({ ...cart, items: updatedItems });
	};

	// Clear the entire cart
	const clearCart = () => {
		setCart(initialCart);
	};

	return {
		cart,
		isLoading,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		itemCount: cart.items.reduce((count, item) => count + item.quantity, 0),
	};
}

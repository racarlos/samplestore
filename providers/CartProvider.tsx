import { useCart } from "@/hooks/useCart";
import React, { createContext, ReactNode, useContext } from "react";

// Define the cart context type
type CartContextType = ReturnType<typeof useCart> | null;

// Create Cart Context with proper typing
const CartContext = createContext<CartContextType>(null);

// Custom hook to use cart context
export const useCartContext = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCartContext must be used within CartProvider");
	}
	return context;
};

// Cart Provider Component
export function CartProvider({ children }: { children: ReactNode }) {
	const cartData = useCart();

	return <CartContext.Provider value={cartData}>{children}</CartContext.Provider>;
}

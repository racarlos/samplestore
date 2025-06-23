import { useOrders } from "@/hooks/useOrders";
import React, { createContext, ReactNode, useContext } from "react";

// Define the orders context type
type OrdersContextType = ReturnType<typeof useOrders> | null;

// Create Orders Context with proper typing
const OrdersContext = createContext<OrdersContextType>(null);

// Custom hook to use orders context
export const useOrdersContext = () => {
	const context = useContext(OrdersContext);
	if (!context) {
		throw new Error("useOrdersContext must be used within OrdersProvider");
	}
	return context;
};

// Orders Provider Component
export function OrdersProvider({ children }: { children: ReactNode }) {
	const ordersData = useOrders();

	return <OrdersContext.Provider value={ordersData}>{children}</OrdersContext.Provider>;
}

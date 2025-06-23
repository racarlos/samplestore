import { Product } from "@/data/interfaces";
import { SEED_PRODUCTS } from "@/data/seed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export function useProducts() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isInitialized, setIsInitialized] = useState(false);

	// Load products from AsyncStorage on mount
	useEffect(() => {
		const loadProducts = async () => {
			try {
				const storedProducts = await AsyncStorage.getItem("products");

				if (storedProducts) {
					const value = JSON.parse(storedProducts);
					setProducts(value);
				} else {
					setProducts(SEED_PRODUCTS);
				}
			} catch (error) {
				console.error("Error loading products from AsyncStorage:", error);
				setProducts(SEED_PRODUCTS);
			} finally {
				setIsLoading(false);
				setIsInitialized(true);
			}
		};

		loadProducts();
	}, []);

	// Save products to AsyncStorage when they change (but not during initial load)
	useEffect(() => {
		// Don't save during initial load
		if (!isInitialized) {
			return;
		}

		const saveProducts = async () => {
			try {
				await AsyncStorage.setItem("products", JSON.stringify(products));
			} catch (error) {
				console.error("Error saving products to AsyncStorage:", error);
			}
		};

		saveProducts();
	}, [products, isInitialized]);

	const getProduct = useCallback(
		(productId: string) => {
			return products.find((product) => product.id === productId);
		},
		[products],
	);

	const resetToSeedData = useCallback(async () => {
		try {
			await AsyncStorage.setItem("products", JSON.stringify(SEED_PRODUCTS));
			setProducts(SEED_PRODUCTS);
		} catch (error) {
			console.error("Error resetting products to seed data:", error);
		}
	}, []);

	return {
		products,
		isLoading,
		resetToSeedData,
	};
}

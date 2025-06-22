import { Product } from "@/data/interfaces";
import { SEED_PRODUCTS } from "@/data/products";
import { useCallback, useEffect, useState } from "react";
import { useAsyncStorage } from "./useAsyncStorage";

export function useProducts() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isInitialized, setIsInitialized] = useState(false);

	const {
		storedValue: storedProducts,
		setValue: setStoredProducts,
		isLoading,
	} = useAsyncStorage<Product[]>("products", []);

	// Initialize products from storage or seed data
	useEffect(() => {
		if (!isLoading && !isInitialized) {
			if (storedProducts.length > 0) {
				setProducts(storedProducts);
			} else {
				// No products in storage, use seed data
				setProducts(SEED_PRODUCTS);
				setStoredProducts(SEED_PRODUCTS);
			}
			setIsInitialized(true);
		}
	}, [isLoading, storedProducts, isInitialized, setStoredProducts]);

	// Sync to storage when products change (but not during initialization)
	useEffect(() => {
		if (isInitialized && !isLoading) {
			setStoredProducts(products);
		}
	}, [products, isInitialized, isLoading, setStoredProducts]);

	const addProduct = useCallback((product: Product) => {
		setProducts((current) => [...current, product]);
	}, []);

	const updateProduct = useCallback((updatedProduct: Product) => {
		setProducts((current) => current.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
	}, []);

	const deleteProduct = useCallback((productId: string) => {
		setProducts((current) => current.filter((product) => product.id !== productId));
	}, []);

	const getProduct = useCallback(
		(productId: string) => {
			return products.find((product) => product.id === productId);
		},
		[products],
	);

	const resetToSeedData = useCallback(async () => {
		setProducts(SEED_PRODUCTS);
		await setStoredProducts(SEED_PRODUCTS);
	}, [setStoredProducts]);

	return {
		products,
		isLoading: !isInitialized || isLoading,
		addProduct,
		updateProduct,
		deleteProduct,
		getProduct,
		resetToSeedData,
	};
}

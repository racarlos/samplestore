import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

/**
 * Custom hook for working with AsyncStorage. Key value pair storage.
 * @param key The storage key to use
 * @param initialValue Default value if nothing exists in storage
 */
export function useAsyncStorage<T>(key: string, initialValue: T) {
	const [storedValue, setStoredValue] = useState<T>(initialValue);
	const [isLoading, setIsLoading] = useState(true);

	// Load from AsyncStorage on mount
	useEffect(() => {
		const loadStoredValue = async () => {
			try {
				const item = await AsyncStorage.getItem(key);
				const value = item ? JSON.parse(item) : initialValue;
				setStoredValue(value);
			} catch (error) {
				console.error(`Error loading ${key} from AsyncStorage:`, error);
			} finally {
				setIsLoading(false);
			}
		};

		loadStoredValue();
	}, [key, initialValue]);

	// Save to AsyncStorage
	const setValue = async (value: T) => {
		try {
			// If value is a function, use the previous state
			const valueToStore = value instanceof Function ? value(storedValue) : value;

			// Save state
			setStoredValue(valueToStore);

			// Save to AsyncStorage
			await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error(`Error saving ${key} to AsyncStorage:`, error);
		}
	};

	// Remove from AsyncStorage
	const removeValue = async () => {
		try {
			await AsyncStorage.removeItem(key);
			setStoredValue(initialValue);
		} catch (error) {
			console.error(`Error removing ${key} from AsyncStorage:`, error);
		}
	};

	return {
		storedValue,
		setValue,
		removeValue,
		isLoading,
	};
}

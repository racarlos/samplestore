export interface Order {
	id: string;
	items: CartItem[];
	total: number;
	discount: Discount | null;
	dateCreated: number;
	status: "Processing" | "Delivered" | "Cancelled";
}

export interface Product {
	id: string;
	productName: string;
	image: string;
	description: string;
	price: number;
	stock: number;
}

export interface CartItem {
	product: Product;
	quantity: number;
}

export interface Cart {
	items: CartItem[];
	total: number;
}

export interface Discount {
	code: string;
	discount: number;
	description: string;
	discountType: "percentage" | "fixed";
}

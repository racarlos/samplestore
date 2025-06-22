export interface Order {
	id: string;
	items: Product[];
	total: number;
	discount: Discount;
	dateCreated: number;
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

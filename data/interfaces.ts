export interface Order {
	id: string;
	items: Product[];
	total: number;
	promo: Promo;
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

export interface Promo {
	code: string;
	discount: number;
	discountType: "percentage" | "fixed";
}

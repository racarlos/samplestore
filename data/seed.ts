import { faker } from "@faker-js/faker";
import { Cart, Order, Product } from "./interfaces";

export const SEED_PRODUCTS: Product[] = [
	{
		id: faker.string.uuid(),
		productName: faker.commerce.productName(),
		image: "https://picsum.photos/300/300?random=1",
		description: faker.commerce.productDescription(),
		price: Number(faker.commerce.price({ min: 29.99, max: 299.99 })),
		stock: faker.number.int({ min: 1, max: 5 }),
	},
	{
		id: faker.string.uuid(),
		productName: faker.commerce.productName(),
		image: "https://picsum.photos/300/300?random=2",
		description: faker.commerce.productDescription(),
		price: Number(faker.commerce.price({ min: 29.99, max: 299.99 })),
		stock: faker.number.int({ min: 1, max: 5 }),
	},
	{
		id: faker.string.uuid(),
		productName: faker.commerce.productName(),
		image: "https://picsum.photos/300/300?random=3",
		description: faker.commerce.productDescription(),
		price: Number(faker.commerce.price({ min: 29.99, max: 299.99 })),
		stock: faker.number.int({ min: 1, max: 5 }),
	},
	{
		id: faker.string.uuid(),
		productName: faker.commerce.productName(),
		image: "https://picsum.photos/300/300?random=4",
		description: faker.commerce.productDescription(),
		price: Number(faker.commerce.price({ min: 29.99, max: 299.99 })),
		stock: faker.number.int({ min: 1, max: 5 }),
	},
	{
		id: faker.string.uuid(),
		productName: faker.commerce.productName(),
		image: "https://picsum.photos/300/300?random=5",
		description: faker.commerce.productDescription(),
		price: Number(faker.commerce.price({ min: 29.99, max: 299.99 })),
		stock: faker.number.int({ min: 1, max: 5 }),
	},
	{
		id: faker.string.uuid(),
		productName: faker.commerce.productName(),
		image: "https://picsum.photos/300/300?random=6",
		description: faker.commerce.productDescription(),
		price: Number(faker.commerce.price({ min: 29.99, max: 299.99 })),
		stock: faker.number.int({ min: 1, max: 5 }),
	},
];

// Initial empty cart
export const EMPTY_CART: Cart = {
	items: [],
	total: 0,
};

// Seed orders for fallback
export const SEED_ORDERS: Order[] = [
	{
		id: faker.string.uuid(),
		items: [
			{
				product: SEED_PRODUCTS[0],
				quantity: 2,
			},
		],
		total: 1250.0,
		discount: null,
		dateCreated: new Date("2025-06-23").getTime(),
		status: "Delivered",
	},
	{
		id: faker.string.uuid(),
		items: [
			{
				product: SEED_PRODUCTS[0],
				quantity: 1,
			},
		],
		total: 890.5,
		discount: null,
		dateCreated: new Date("2025-06-22").getTime(),
		status: "Processing",
	},
	{
		id: faker.string.uuid(),
		items: [
			{
				product: SEED_PRODUCTS[0],
				quantity: 1,
			},
			{
				product: SEED_PRODUCTS[1],
				quantity: 2,
			},
		],
		total: 2100.0,
		discount: null,
		dateCreated: new Date("2025-06-21").getTime(),
		status: "Delivered",
	},
];

// Discount codes data
export const DISCOUNT_CODES = [
	{
		code: "DISCOUNT10",
		description: "10% off your order",
		discountType: "percentage",
		discount: 10,
	},
	{
		code: "PROMO100",
		description: "₱100 off your order",
		discountType: "fixed",
		discount: 100,
	},
];

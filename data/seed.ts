import { faker } from "@faker-js/faker";
import { Product } from "./interfaces";

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

// Dummy order history data
export const DUMMY_ORDERS = [
	{
		id: "1",
		date: "2024-01-15",
		total: 1250.0,
		status: "Delivered",
		items: 3,
		orderNumber: "ORD-2024-001",
	},
	{
		id: "2",
		date: "2024-01-10",
		total: 890.5,
		status: "Processing",
		items: 2,
		orderNumber: "ORD-2024-002",
	},
	{
		id: "3",
		date: "2024-01-05",
		total: 2100.0,
		status: "Delivered",
		items: 4,
		orderNumber: "ORD-2024-003",
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

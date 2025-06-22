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

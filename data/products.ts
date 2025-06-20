import { faker } from "@faker-js/faker";
import { Product } from "./interfaces";

export const SEED_PRODUCTS: Product[] = [
	{
		id: "1",
		productName: faker.commerce.productName(),
		image: faker.image.urlLoremFlickr({ category: "product", width: 300, height: 300 }),
		description: faker.commerce.productDescription(),
		price: Number(faker.commerce.price({ min: 29.99, max: 299.99 })),
		quantity: faker.number.int({ min: 1, max: 5 }),
	},
	{
		id: "2",
		productName: faker.commerce.productName(),
		image: faker.image.urlLoremFlickr({ category: "product", width: 300, height: 300 }),
		description: faker.commerce.productDescription(),
		price: Number(faker.commerce.price({ min: 29.99, max: 299.99 })),
		quantity: faker.number.int({ min: 1, max: 5 }),
	},
	{
		id: "3",
		productName: faker.commerce.productName(),
		image: faker.image.urlLoremFlickr({ category: "product", width: 300, height: 300 }),
		description: faker.commerce.productDescription(),
		price: Number(faker.commerce.price({ min: 29.99, max: 299.99 })),
		quantity: faker.number.int({ min: 1, max: 5 }),
	},
	{
		id: "4",
		productName: faker.commerce.productName(),
		image: faker.image.urlLoremFlickr({ category: "product", width: 300, height: 300 }),
		description: faker.commerce.productDescription(),
		price: Number(faker.commerce.price({ min: 29.99, max: 299.99 })),
		quantity: faker.number.int({ min: 1, max: 5 }),
	},
	{
		id: "5",
		productName: faker.commerce.productName(),
		image: faker.image.urlLoremFlickr({ category: "product", width: 300, height: 300 }),
		description: faker.commerce.productDescription(),
		price: Number(faker.commerce.price({ min: 29.99, max: 299.99 })),
		quantity: faker.number.int({ min: 1, max: 5 }),
	},
	{
		id: "6",
		productName: faker.commerce.productName(),
		image: faker.image.urlLoremFlickr({ category: "product", width: 300, height: 300 }),
		description: faker.commerce.productDescription(),
		price: Number(faker.commerce.price({ min: 29.99, max: 299.99 })),
		quantity: faker.number.int({ min: 1, max: 5 }),
	},
];

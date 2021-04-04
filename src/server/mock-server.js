import { createServer, Model, Factory } from "miragejs";
import faker from "faker";

const getRandomProducts = (count) => {
	const products = [];
	for (let i = 0; i < count; i++) {
		products.push({
			id: faker.datatype.uuid,
			name: faker.commerce.productName,
		});
	}
	return products;
};

const createMockServer = () => {
	createServer({
		models: {
			category: Model,
			product: Model,
			cart: Model,
			wishList: Model,
		},
		factories: {
			category: Factory.extend({
				id: faker.datatype.uuid,
				name: faker.commerce.department,
				isTrending: faker.datatype.boolean,
				products: getRandomProducts(10),
			}),
			product: Factory.extend({
				id: faker.datatype.uuid,
				image: faker.random.image,
				name: faker.commerce.product,
				description: "This is an awesome product",
				price: faker.commerce.price,
				discount: faker.random.arrayElement([
					"10% off",
					"15% off",
					"20% off",
					"25% off",
				]),
				rating: faker.datatype.number(5),
				isTrending: faker.datatype.boolean,
			}),
		},
		routes() {
			this.get("/categories", (schema) => {
				return schema.all("category");
			});
			this.get("/products", (schema) => {
				return schema.all("product");
			});
		},
		seeds(server) {
			server.createList("category", 10);
			server.createList("product", 15);
		},
	});
};

export default createMockServer;

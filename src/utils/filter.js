const filterByRange = (arr, range) => {
	return arr.filter((product) => parseInt(product.price) <= parseInt(range));
};

const filterByCategory = (arr, category) => {
	return arr.filter(
		(product) =>
			product.category.name.toLowerCase() === category.replace('_', ' ').toLowerCase(),
	);
};

export { filterByRange, filterByCategory };

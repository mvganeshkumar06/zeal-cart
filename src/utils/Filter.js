const filterByRange = (arr, range) => {
	return arr.filter((item) => parseInt(item.price) <= parseInt(range));
};

export default filterByRange;

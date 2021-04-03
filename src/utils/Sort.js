const sortInIncreasingOrder = (arr) => {
	const modifiedArr = [...arr];

	modifiedArr.sort((a, b) => {
		if (parseInt(a.price) < parseInt(b.price)) {
			return -1;
		}
		return 1;
	});

	return modifiedArr;
};

const sortInDecreasingOrder = (arr) => {
	const modifiedArr = [...arr];

	modifiedArr.sort((a, b) => {
		if (parseInt(a.price) > parseInt(b.price)) {
			return -1;
		}
		return 1;
	});

	return modifiedArr;
};

const sortByTrending = (arr) => {
	const modifiedArr = [...arr];

	modifiedArr.sort((a, b) => {
		if (a.isTrending && !b.isTrending) {
			return -1;
		}
		return 1;
	});

	return modifiedArr;
};

const sortByRating = (arr) => {
	const modifiedArr = [...arr];

	modifiedArr.sort((a, b) => {
		if (parseInt(a.rating) > parseInt(b.rating)) {
			return -1;
		}
		return 1;
	});

	return modifiedArr;
};

export {
	sortInIncreasingOrder,
	sortInDecreasingOrder,
	sortByTrending,
	sortByRating,
};

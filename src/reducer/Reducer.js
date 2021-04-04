const reducer = (state, action) => {
	switch (action.type) {
		case "SET_PRODUCTS":
			return {
				...state,
				products: [...state.products, ...action.payload],
			};
		case "ADD_TO_WISHLIST":
			return {
				...state,
				wishList: [...state.wishList, action.payload],
			};
		case "REMOVE_FROM_WISHLIST":
			return {
				...state,
				wishList: state.wishList.filter((item) => {
					return item.id !== action.payload;
				}),
			};
		case "ADD_TO_CART":
			return {
				...state,
				cart: [...state.cart, action.payload],
			};
		case "REMOVE_FROM_CART":
			return {
				...state,
				cart: state.cart.filter((item) => {
					return item.id !== action.payload;
				}),
			};
		case "SET_PRICE_LOW_TO_HIGH":
		case "SET_PRICE_HIGH_TO_LOW":
		case "SET_TRENDING_FIRST":
		case "SET_RATING":
			return {
				...state,
				sortOption: action.payload,
			};
		case "SET_PRICE_RANGE":
			return {
				...state,
				filterOptions: {
					...state.filterOptions,
					priceRange: action.payload,
				},
			};
		case "RESET_SORT":
			return {
				...state,
				sortOption: "",
			};
		case "RESET_FILTER":
			return {
				...state,
				filterOptions: {
					...state.filterOptions,
					priceRange: 0,
				},
			};
		case "RESET_SORT_AND_FILTER":
			return {
				...state,
				sortOption: "",
				filterOptions: {
					...state.filterOptions,
					priceRange: 0,
				},
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

export default reducer;

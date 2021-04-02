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
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

export default reducer;

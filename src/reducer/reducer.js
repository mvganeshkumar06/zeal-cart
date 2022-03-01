const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_PRODUCTS':
			return {
				...state,
				products: action.payload,
			};
		case 'SET_PRODUCT':
			return {
				...state,
				product: action.payload,
			};
		case 'SET_CATEGORIES':
			return {
				...state,
				categories: action.payload,
			};
		case 'SET_USER': {
			return {
				...state,
				user: action.payload,
			};
		}
		case 'SET_ACCESS_TOKEN': {
			return {
				...state,
				accessToken: action.payload,
			};
		}
		case 'SET_WISHLIST':
			return {
				...state,
				wishList: action.payload,
			};
		case 'SET_CART':
			return {
				...state,
				cart: action.payload,
			};
		case 'SET_PRICE_LOW_TO_HIGH':
		case 'SET_PRICE_HIGH_TO_LOW':
		case 'SET_TRENDING_FIRST':
		case 'SET_RATING':
			return {
				...state,
				sortOption: action.payload,
			};
		case 'SET_PRICE_RANGE':
			return {
				...state,
				filterOptions: {
					...state.filterOptions,
					priceRange: action.payload,
				},
			};
		case 'SET_CATEGORY':
			return {
				...state,
				filterOptions: {
					...state.filterOptions,
					category: action.payload,
				},
			};
		case 'RESET_SORT':
			return {
				...state,
				sortOption: '',
			};
		case 'RESET_FILTER':
			return {
				...state,
				filterOptions: {
					...state.filterOptions,
					priceRange: 1500,
					category: '',
				},
			};
		case 'RESET_SORT_AND_FILTER':
			return {
				...state,
				sortOption: '',
				filterOptions: {
					...state.filterOptions,
					priceRange: 1500,
					category: '',
				},
			};
		case 'SET_IS_LOADING': {
			return {
				...state,
				isLoading: { ...state.isLoading, ...action.payload },
			};
		}
		case 'SET_IS_ERROR': {
			return {
				...state,
				isError: { ...state.isError, ...action.payload },
			};
		}
		case 'SET_PRODUCT_TOAST': {
			return {
				...state,
				productToast: action.payload,
			};
		}
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};

export default reducer;

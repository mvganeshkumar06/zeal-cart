const reducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {
                ...state,
                products: [...state.products, ...action.payload],
            };
        case "SET_USER": {
            return {
                ...state,
                user: action.payload,
            };
        }
        case "SET_WISHLIST":
            return {
                ...state,
                wishList: action.payload,
            };
        case "SET_CART":
            return {
                ...state,
                cart: action.payload,
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
                    priceRange: 1500,
                },
            };
        case "RESET_SORT_AND_FILTER":
            return {
                ...state,
                sortOption: "",
                filterOptions: {
                    ...state.filterOptions,
                    priceRange: 1500,
                },
            };
        case "SET_IS_LOADING": {
            return {
                ...state,
                isLoading: action.payload,
            };
        }
        case "SET_IS_ERROR": {
            return {
                ...state,
                isError: action.payload,
            };
        }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

export default reducer;

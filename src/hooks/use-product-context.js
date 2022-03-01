import { useContext } from 'react';
import ProductContext from '../context/product-context';

const useProductContext = () => {
	return useContext(ProductContext);
};

export default useProductContext;

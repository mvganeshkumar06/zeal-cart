const filterByRange = (arr, range) => {
    return arr.filter((product) => parseInt(product.price) <= parseInt(range));
};

export default filterByRange;

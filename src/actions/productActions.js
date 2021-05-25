import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE} from "../types";

export const fetchProducts = () => async(dispatch) => {
    const res=await fetch("/api/products");
    const data=await res.json();
    dispatch({
        type:FETCH_PRODUCTS,
        payload:data,
    })
}

export const filterProducts = (products, size) => (dispatch) => {
    dispatch({
        type:FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size:size,
            items:size=="ALL" ? products :
            products.filter((product) => product.availableSizes.indexOf(size)>=0)}
    })
}

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
    const sortedProducts = filteredProducts.slice();
    if (sort === "latest"){
        sortedProducts.sort((a,b)=> a._id >b._id ? 1 : -1);
    }
    else if (sort==="lowest") {
        sortedProducts.sort((a,b) => a.price -b.price);
    }
    else {
        sortedProducts.sort((a,b) => b.price - a.price);
    }
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: sortedProducts
        }
    })
}
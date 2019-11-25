import * as Types from './actionType';

// dispatch of login
// export const userLogin = (payload) => {
//     return {
//         type: Types.START_LOGIN,
//         name: payload.name,
//         pass: payload.pass,
//         resolve: payload.resolve,
//         reject: payload.reject
//     }
// }

// dispatch of redux
export const showProductTask = () => {
    return {
        type: Types.GET_DATA_PRODUCT,
    }
};
export const showCustomerTask = () => {
    return {
        type: Types.GET_DATA_CUSTOMERS,
    }
}
export const postProductTask = (product) => {
    return {
        type: Types.POST_DATA_PRODUCT,
        product
    }
}

// export const deleteProduct = (newCarts) => {
//     return {
//         type: Types.DELETE_PRODUCT,
//         newCarts
//     }
// }

// export const getCarts = () => {
//     return {
//         type: Types.START_APP
//     }
// }

// dispatch of redux-saga
export const fetchSuccessProducts = (products) => {
    return {
        type: Types.FETCH_DATA_PRODUCT_SUCCESS,
        products,
    }
};

export const fetchFailProduct = (err) => {
    return {
        type: Types.FETCH_DATA_PRODUCT_FALID,
        err,
    }
}
export const fetchSuccessCustomers = (customers) => {
    return {
        type: Types.FETCH_DATA_CUSTOMERS_SUCCESS,
        customers
    }
}
export const fetchFailCustomers = (err) => {
    return {
        type: Types.FETCH_DATA_CUSTOMERS_FAILD,
        err
    }
}
export const fetchPostSuccessProduct = (response) => {
    return {
        type: Types.FETCH_POST_DATA_PRODUCT_SUCCESS,
        response
    }
}
export const fetchPostFaildProduct = (error) => {
    return {
        type: Types.FETCH_POST_DATA_PRODUCT_FAILD,
        error
    }
}
import uuid from 'uuid/v1';
import * as Types from '../action/actionType';

const initState = {
    products: [
        
    ],
    err: null,
    response:null,
};

const productReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.FETCH_DATA_PRODUCT_SUCCESS: {
            return {
                ...state,
                products: action.products
            }
        }
        case Types.FETCH_DATA_PRODUCT_FALID: {
            return {
                ...state,
                err: action.error,
            }
        }
        case Types.FETCH_POST_DATA_PRODUCT_SUCCESS: {
            return {
                ...state,
                response: action.response
            }
        }
        case Types.FETCH_POST_DATA_PRODUCT_FAILD: {
            return {
                ...state,
                err: action.error
            }
        }
        default:
            return state;
    }
}
export default productReducer;
import uuid from 'uuid/v1';
import * as Types from '../action/actionType';

const initState = {
    products: [
        {
            id: uuid(),
            name: 'Yeezy350Sesame',
            url: 'https://www.youbetterfly.com/image/cache/catalog/November%20sneakers/Adidas%20Yeezy%20Boost%20350%20Sesame-500x500.jpg',
            price: '594',
            createdAt: '27/03/2019',
            category: 'adidas',
            color: 'Tripple_White'
        },
        {
            id: uuid(),
            name: 'Yeezy350Sesame',
            url: 'https://cdn.shopify.com/s/files/1/1117/1018/products/v2stat_800x.png?v=1557231982',
            price: '625',
            createdAt: '31/03/2019',
            category: 'adidas',
            color: 'Tripple_White'
        },
        {
            id: uuid(),
            name: 'Yeezy350Sesame',
            url: 'https://ns.imgix.net/product/1563205886114_adidasYeezyBoost350V2Clay0.png',
            price: '857',
            createdAt: '03/04/2019',
            category: 'adidas',
            color: 'Tripple_White'
        },
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
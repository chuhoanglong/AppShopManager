import { takeEvery, put } from 'redux-saga/effects';
import * as API from './API';
import * as Types from '../action/actionType';

function* fetchDataProduct(action) {
    try {
        const products = yield API.getDataProducts();

        yield put({ type: Types.FETCH_DATA_PRODUCT_SUCCESS, products });
        console.log('products', products);
    } catch (error) {
        console.log('error productSaga', error);

        yield put({ type: Types.FETCH_DATA_PRODUCT_FALID, error });
    }
}

function* fetPostDataProduct(action) {
    try {
        const response = yield API.postDataProduct(action.product);
        console.log(response);
        
        yield put({ type: Types.FETCH_POST_DATA_PRODUCT_SUCCESS, response });
    } catch (error) {
        yield put({ type: Types.FETCH_POST_DATA_PRODUCT_FAILD, error });
    }
}

export function* productSaga() {
    yield takeEvery(Types.GET_DATA_PRODUCT, fetchDataProduct);
}
export function* postProductSaga() {
    yield takeEvery(Types.POST_DATA_PRODUCT, fetPostDataProduct);
}


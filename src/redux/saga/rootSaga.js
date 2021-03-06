import { all } from 'redux-saga/effects';
import * as productSaga from './productSaga';
import * as customersSaga from './customersSaga';
import * as loginWithFirebaseSaga from './authSaga';

export default function* rootSaga() {
    yield all(
        [
            productSaga.productSaga(),
            productSaga.postProductSaga(),
            customersSaga.customersSaga(),
            loginWithFirebaseSaga.loginWithFirebaseSaga()
        ]
    );
}
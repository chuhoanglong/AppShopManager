import { takeEvery, put } from 'redux-saga/effects';
import * as API from './API';
import * as Types from '../action/actionType';

function* loginWithFirebase(action) {
    try {
        const currentUser = yield API.loginWithFirebase(action.payload);
        yield put({ type: Types.LOGIN_WITH_FIREBASE_SUCCESS, currentUser });
        action.payload.resolve(currentUser);
    } catch (error) {
        yield put({ type: Types.LOGIN_WITH_FIREBASE_FAILD, error });
        action.payload.reject(error);
    }
}

export function* loginWithFirebaseSaga() {
    yield takeEvery(Types.LOGIN_WITH_FIREBASE, loginWithFirebase);
}
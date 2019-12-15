import * as Types from '../action/actionType';

const initState = {
    users: null,
    error: null
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.LOGIN_WITH_FIREBASE: {
            return {
                ...state
            }
        }
        case Types.LOGIN_WITH_FIREBASE_SUCCESS: {
            return {
                ...state,
                users: action.currentUser
            }
        }
        case Types.LOGIN_WITH_FIREBASE_FAILD: {
            return {
                ...state,
                error: action.error
            }
        }
        default: return state;
    }
}

export default authReducer;
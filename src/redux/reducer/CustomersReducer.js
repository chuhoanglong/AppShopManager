import * as Types from '../action/actionType';
import uuid from 'uuid/v1';

const initState = {
    customers: [
        {
            id: uuid(),
            name: 'Ekaterina Tankova',
            address: {
                country: 'USA',
                state: 'West Virginia',
                city: 'Parkersburg',
                street: '2849 Fulton Street'
            },
            email: 'ekaterina.tankova@devias.io',
            phone: '304-428-3097',
            avatarUrl: '/images/avatars/avatar_3.png',
            createdAt: 1555016400000
        },
    ]
};

const customersReducer = (state = initState, action) => {
    switch (action.type) {
        case Types.GET_DATA_CUSTOMERS:{
            return {
                ...state
            }
        }
        case Types.FETCH_DATA_CUSTOMERS_SUCCESS: {
            return {
                ...state,
                customers: action.customers
            };
        }
        case Types.FETCH_DATA_CUSTOMERS_FAILD: {
            return{
                ...state,
                customers: []
            }
        }
        default:
            return state;
    }
}
export default customersReducer;
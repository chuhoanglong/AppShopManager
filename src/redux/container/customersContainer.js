import UserComponent from '../../views/UserList/UserList';
import { connect } from 'react-redux';
import { showCustomerTask } from '../action/rootAction';

const mapStateToProps = (state) => {
    return {
        customers: state.CustomersReducer.customers,
        users: state.authReducer.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showCustomerTask: (payload) => {
            dispatch(showCustomerTask(payload))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
import UserComponent from '../../views/UserList/UserList';
import { connect } from 'react-redux';
import { showCustomerTask } from '../action/rootAction';

const mapStateToProps = (state) => {
    return {
        customers: state.CustomersReducer.customers
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showCustomerTask: () => {
            dispatch(showCustomerTask())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
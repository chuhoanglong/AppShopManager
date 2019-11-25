import ProductComponent from '../../views/ProductList/ProductList';
import { connect } from 'react-redux';
import { showProductTask } from '../action/rootAction';

const mapStateToProps = (state) => {
    return {
        products: state.ProductReducer.products
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        showProductTask: () => {
            dispatch(showProductTask());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
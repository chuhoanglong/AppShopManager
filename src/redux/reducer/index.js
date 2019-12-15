import { combineReducers } from "redux";
import ProductReducer from "./ProductReducer";
import CustomersReducer from "./CustomersReducer";
import authReducer from "./authReducer";

export default combineReducers({ ProductReducer, CustomersReducer, authReducer });
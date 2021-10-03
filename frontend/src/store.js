import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { adminUpdateUserReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./reducers/userReducers";
import { productCreateReducer, productDeleteReducer, productEditReducer, productListReducer } from "./reducers/productReducers";

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    productCreate: productCreateReducer,
    productDelete: productDeleteReducer,
    productEdit: productEditReducer,
    productList: productListReducer,
    adminUpdateUser: adminUpdateUserReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store
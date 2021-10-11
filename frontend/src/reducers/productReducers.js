import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL, EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_PRODUCT_REQUEST:
            return { loading: true }
        case ADD_PRODUCT_SUCCESS:
            return { loading: false, DetailProduct: action.payload }
        case ADD_PRODUCT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return { loading: true }
        case DELETE_PRODUCT_SUCCESS:
            return { loading: false, success: true }
        case DELETE_PRODUCT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productEditReducer = (state = {}, action) => {
    switch (action.type) {
        case EDIT_PRODUCT_REQUEST:
            return { loading: true }
        case EDIT_PRODUCT_SUCCESS:
            return { loading: false, DetailProduct: action.payload }
        case EDIT_PRODUCT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productListReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { ...state, loading: true }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, productList: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return state
    }
}

export const productDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return { ...state, loading: true }
        case PRODUCT_DETAIL_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return state
    }
}

// export const userRegisterReducer = (state = {}, action) => {
//     switch (action.type) {
//         case USER_REGISTER_REQUEST:
//             return { loading: true }
//         case USER_REGISTER_SUCCESS:
//             return { loading: false, userInfo: action.payload }
//         case USER_REGISTER_FAIL:
//             return { loading: false, error: action.payload }

//         default:
//             return state
//     }
// }

// export const userDetailsReducer = (state = { user: {} }, action) => {
//     switch (action.type) {
//         case USER_DETAILS_REQUEST:
//             return { ...state, loading: true }
//         case USER_DETAILS_SUCCESS:
//             return { loading: false, user: action.payload }
//         case USER_DETAILS_FAIL:
//             return { loading: false, error: action.payload }

//         default:
//             return state
//     }
// }

// export const userUpdateProfileReducer = (state = {}, action) => {
//     switch (action.type) {
//         case USER_UPDATE_PROFILE_REQUEST:
//             return { loading: true }
//         case USER_UPDATE_PROFILE_SUCCESS:
//             return { loading: false, success: true, userInfo: action.payload }
//         case USER_UPDATE_PROFILE_FAIL:
//             return { loading: false, error: action.payload }
//         default:
//             return state
//     }
// }

import axios from "axios";
import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL, EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_SUCCESS } from "../constants/productConstants";

export const uploadProduct = (product) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState()
        dispatch({
            type: ADD_PRODUCT_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const response = await axios.post(
            '/api/stamps',
            product,
            config
        )

        const {data} = response

        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: data
        })

        return response

    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState()
        dispatch({
            type: DELETE_PRODUCT_REQUEST
        })

        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const response = await axios.delete(
            `/api/stamps/${id}`,
            config
        )

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
        })

        return response

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const editProduct = (product) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState()
        dispatch({
            type: EDIT_PRODUCT_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const response = await axios.put(
            `/api/stamps/${product._id}`,
            product,
            config
        )

        const {data} = response 
        dispatch({
            type: EDIT_PRODUCT_SUCCESS,
            payload: data
        })

        return response

    } catch (error) {
        dispatch({
            type: EDIT_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

// export const logout = () => (dispatch) => {
//     localStorage.removeItem('userInfo')
//     dispatch({
//         type: USER_LOGOUT
//     })
// }

// export const register = ({name, email, password}) => async (dispatch) => {
//     try {
//         dispatch({
//             type: USER_REGISTER_REQUEST
//         })

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }

//         const { data } = await axios.post(
//             '/api/users',
//             { name, email, password },
//             config
//         )

//         dispatch({
//             type: USER_REGISTER_SUCCESS,
//             payload: data
//         })

//         dispatch({
//             type: USER_LOGIN_SUCCESS,
//             payload: data
//         })

//         localStorage.setItem('userInfo', JSON.stringify(data))

//     } catch (error) {
//         dispatch({
//             type: USER_REGISTER_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message
//         })
//     }
// }

// export const getUserDetails = (id) => async (dispatch, getState) => {
//     try {

//         const { userLogin: { userInfo } } = getState()
//         dispatch({
//             type: USER_DETAILS_REQUEST
//         })

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.get(
//             `/api/users/${id}`,
//             config
//         )

//         dispatch({
//             type: USER_DETAILS_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: USER_DETAILS_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message
//         })
//     }
// }

// export const updateUserProfile = (user) => async (dispatch, getState) => {
//     try {

//         const { userLogin: { userInfo } } = getState()
//         dispatch({
//             type: USER_UPDATE_PROFILE_REQUEST
//         })

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.put(
//             `/api/users/profile`,
//             user,
//             config
//         )

//         dispatch({
//             type: USER_UPDATE_PROFILE_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: USER_UPDATE_PROFILE_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.message
//         })
//     }
// }
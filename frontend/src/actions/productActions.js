
import axios from "axios";
import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, EDIT_PRODUCT_FAIL, EDIT_PRODUCT_REQUEST, EDIT_PRODUCT_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";
import { logout } from "./userActions";

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
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed'){
            dispatch(logout())
        } 
        dispatch({
            type: ADD_PRODUCT_FAIL,
            payload: message
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
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed'){
            dispatch(logout())
        } 
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: message
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
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed'){
            dispatch(logout())
        } 
        dispatch({
            type: EDIT_PRODUCT_FAIL,
            payload: message
        })
    }
}

export const getStampList = (page, pageSize) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })

        let url =  "/api/stamps?";
        url += "pageSize=" + pageSize;
        url += "&pageNumber=" + (page + 1);

        const { data } = await axios.get(url)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: message
        })
    }
}

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../actions/userActions'

function Logout(props) {
    const dispatch = useDispatch()
    dispatch(logout())

    return (

        <div>
            Logging out ...
            <Redirect path='/' />
        </div>
    )
}

export default Logout

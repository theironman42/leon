import { Container, } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import UserForm from '../Components/Admin/UserForm';


function ProfileScreen({ history, location }) {
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { user, loading, error } = userDetails
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile


    useEffect(() => {
        if (!userInfo) {
            history.push('/login?redirect=profile')
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                
            }
        }
    }, [history, userInfo, dispatch, user])

    const onSubmit = (data) => {
        dispatch(updateUserProfile({
            id: user._id,
           ...data
        }))

    }

    return (
        <Container>
            <h1>Profile</h1>
            {user && user._id && <UserForm data={user} onSubmit={onSubmit} onCancel={()=>history.push('/')} />}
        </Container>
    )
}

export default ProfileScreen

import { Box, Button, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import UserForm from '../Components/Admin/UserForm';
import { ControlTextField } from '../Components/ControlFields';

const useStyles = makeStyles({
    buttonsBox: {
        textAlign: 'right'
    },
    cancelButton: {
        margin: "12px"
    },
    saveButton: {
        margin: "12px"
    }
});

function ProfileScreen({ history, location }) {
    const dispatch = useDispatch()
    const methods = useForm()
    const { setValue } = methods

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
    }, [history, userInfo, dispatch,setValue, user])

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

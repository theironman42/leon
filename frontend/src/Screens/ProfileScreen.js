import { Box, Button, Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions"
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
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const classes = useStyles()
    const dispatch = useDispatch()
    const methods = useForm()
    const { handleSubmit, control, getValues, setValue, formState: { errors } } = methods

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
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setValue('name', user.name)
                setValue('email', user.email)
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
            <FormProvider {...methods} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <ControlTextField
                                name="name"
                                control={control}
                                required={true}
                                label="Name"
                                fullWidth={true}
                                error={!!errors.name} />
                        </Grid>
                        <Grid item xs={12}>
                            <ControlTextField
                                name="email"
                                control={control}
                                required={true}
                                label="Email"
                                fullWidth={true}
                                error={!!errors.email} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ControlTextField
                                name="password"
                                type="password"
                                control={control}
                                required={true}
                                label="Change Password"
                                fullWidth={true}
                                error={!!errors.password} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ControlTextField
                                name="confirmPassword"
                                type="password"
                                rules={{ validate: (value) => getValues('password') === value }}
                                control={control}
                                required={true}
                                label="Confirm Changed Password"
                                fullWidth={true}
                                error={!!errors.confirmPassword} />
                        </Grid>
                    </Grid>
                    <Box className={classes.buttonsBox}>
                        <Button type="button" variant="outlined" className={classes.cancelButton} onClick={() => { history.push('/') }} >Cancel</Button>
                        <Button type="submit" variant="outlined" className={classes.saveButton}>Submit</Button>
                    </Box>
                </form>
            </FormProvider>
        </Container>
    )
}

export default ProfileScreen

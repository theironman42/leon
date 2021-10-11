import React, { useEffect } from 'react'
import { Box, Button, Container, Grid } from '@material-ui/core'
import { FormProvider, useForm } from 'react-hook-form'
import { ControlTextField } from '../Components/ControlFields'
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../actions/userActions';
import { makeStylesGlobal } from '../theme/GlobalTheme';
const useStyles = makeStylesGlobal({})


function LoginUser(props) {
    const classes = useStyles()
    const methods = useForm()
    const dispatch = useDispatch()
    const { handleSubmit, control, formState: { errors } } = methods
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/'

    const onSubmit = (data) => {
        dispatch(login(data))
    }
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [props.history, redirect, userInfo])
    return (
        <>
        <Container>
            <h1>Login User</h1>
            <FormProvider {...methods} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
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
                                label="Password"
                                fullWidth={true}
                                error={!!errors.password} />
                        </Grid>
                    </Grid>
                    <Box className={classes.buttonsBox}>
                        <Button type="button" variant="outlined" className={classes.cancelButton} onClick={() => { props.history.push('/') }} >Cancel</Button>
                        <Button type="submit" variant="outlined" className={classes.saveButton}>Submit</Button>
                    </Box>
                </form>
            </FormProvider>
        </Container>
    </>
    )
}

export default LoginUser

import React from 'react'
import { Box, Button, Container, Grid } from '@material-ui/core'
import { FormProvider, useForm } from 'react-hook-form'
import { ControlTextField } from '../Components/ControlFields'
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';


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

function RegisterUser(props) {

    const classes = useStyles()
    const methods = useForm()
    const dispatch = useDispatch()
    const { handleSubmit, control, getValues, formState: { errors } } = methods
    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, loading, error } = userRegister
    const onSubmit = (data) => {
        dispatch(register(data))
    }

    return (
        <>
            <Container>
                <h1>Register User</h1>
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
                                    label="Password"
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
                                    label="Confirm Password"
                                    fullWidth={true}
                                    error={!!errors.confirmPassword} />
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

export default RegisterUser

import { Box, Button, Container, Grid } from '@material-ui/core'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { makeStylesGlobal } from '../../theme/GlobalTheme'
import { ControlSelect, ControlTextField } from '../ControlFields'
import Message from '../Message'

const PASSWORD_SIZE = 2

const useStyles = makeStylesGlobal(()=>{})



function UserForm({onSubmit, onCancel, data, isAdmin}) {
    

    const defaultValues = {
        name: data ? data.name : "",
        email: data ? data.email : "",
        password: "",
        confirmPassword: "",
        role: data ? data.role : "USER"
    }
    const methods = useForm({ defaultValues })
    const { handleSubmit, control, getValues, formState: { errors } } = methods
    const classes = useStyles()

    const validatePasswords = (value) =>{
        const password = getValues('password')
        const passwordsAreEqual = password === value
        const isBigEnough = value.length > PASSWORD_SIZE
        const isNotPassword = value.length < 1
        return (passwordsAreEqual && isBigEnough )|| (isNotPassword && passwordsAreEqual)
    }
    return (
        <Container>
        <h1>User Form</h1>
            <FormProvider {...methods} >
                <form onSubmit={handleSubmit((formData)=>onSubmit({...data, ...formData}))}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Message message = "COUCOU"></Message>
                        </Grid>
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
                                required={!data}
                                control={control}
                                label="Change Password"
                                fullWidth={true}
                                error={!!errors.password} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ControlTextField
                                name="confirmPassword"
                                type="password"
                                required={!data}
                                rules={{ validate: (value) => {return validatePasswords(value)} }}
                                control={control}
                                label="Confirm Changed Password"
                                fullWidth={true}
                                error={!!errors.confirmPassword} />
                        </Grid>
                        {isAdmin && <Grid item xs={12} md={6}>
                            <ControlSelect
                                name="role"
                                control={control}
                                required={true}
                                label="Role"
                                fullWidth={true}
                                values={["USER","SELLER","ADMIN"]}
                                error={!!errors.role} />
                        </Grid>}
                    </Grid>
                    <Box className={classes.buttonsBox}>
                        <Button type="button" variant="outlined" className={classes.cancelButton} onClick={onCancel} >Cancel</Button>
                        <Button type="submit" variant="outlined" className={classes.saveButton}>Submit</Button>
                    </Box>
                </form>
            </FormProvider>
        </Container>
    )
}
    export default UserForm

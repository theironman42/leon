import { Box, Button, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ControlSelect, ControlTextField } from '../ControlFields'

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


function UserForm({onSubmit, onCancel, data, isAdmin}) {
    
    console.log(data)

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
    return (
        <>
            <FormProvider {...methods} >
                <form onSubmit={handleSubmit((formData)=>onSubmit({...data, ...formData}))}>
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
                                rules={{ validate: (value) => {return (getValues('password') === value)&&(value && (value.length > 2))} }}
                                control={control}
                                required={true}
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
        </>
    )
}
    export default UserForm

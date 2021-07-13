import { Button, Container, Grid, TextField } from '@material-ui/core'
import React from 'react'
import { Controller, useForm } from "react-hook-form"
import { postData } from '../../Utils/backend'

const defaultValues = {

}

function StampsAdmin() {
    const { handleSubmit, reset, watch, control, formState:{ errors} } = useForm({ defaultValues })
    const onSubmit = data => { postData('/api/stamps', data); console.log(data) }

    const ControlTextField = ({ name, required, ...props }) => {
        console.log(required)
        return <Controller
            name={name}
            control={control}
            rules={{ required:required }}
            render={({ field }) => <TextField {...field} {...props} />}
        />
    }
    console.log(errors)
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ControlTextField name="name" required={true} label="Name" fullWidth={true} error={!!errors.name} />
                    </Grid>
                    <Grid item xs={12}>
                        <ControlTextField name="image" label="Image" fullWidth={true} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ControlTextField name="country" label="Country" fullWidth={true} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ControlTextField name="price" required={true} type="number" label="Price" fullWidth={true} error={!!errors.price} />
                    </Grid>
                    <Grid item xs={12}>
                        <ControlTextField name="description" label="Description" fullWidth={true} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="outlined" >Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default StampsAdmin

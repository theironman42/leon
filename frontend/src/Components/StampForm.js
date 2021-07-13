import { Button, Container, Grid } from '@material-ui/core'
import React from 'react'
import { useForm } from "react-hook-form"
import { ControlTextField } from './ControlFields'
import { postData } from '../Utils/backend'

const defaultValues = {

}

function StampForm() {
    const { handleSubmit, control, formState:{ errors} } = useForm({ defaultValues })
    const onSubmit = data => { postData('/api/stamps', data); console.log(data) }

    
    console.log(errors)
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ControlTextField name="name" control={control} required={true} label="Name" fullWidth={true} error={!!errors.name} />
                    </Grid>
                    <Grid item xs={12}>
                        <ControlTextField name="image" control={control} label="Image" fullWidth={true} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ControlTextField name="country" control={control} label="Country" fullWidth={true} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ControlTextField name="price" control={control} required={true} type="number" label="Price" fullWidth={true} error={!!errors.price} />
                    </Grid>
                    <Grid item xs={12}>
                        <ControlTextField name="description" control={control} label="Description" fullWidth={true} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="outlined" fullWidth={true} >Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default StampForm

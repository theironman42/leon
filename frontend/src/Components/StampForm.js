import { Box, Button, Container, Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { useForm } from "react-hook-form"
import { ControlTextField } from './ControlFields'
import { postData } from '../Utils/backend'

const useStyles = makeStyles({
    buttonsBox: {
            textAlign: 'right'
    },
    cancelButton:{
        margin: "12px"
    },
    saveButton: {
        margin: "12px"
    }
});

function StampForm({
    data,
    onClose,
    isNew,
    onUpdate,
}) {
    const classes = useStyles()
    const defaultValues = {
        name: data ? data.name : "",
        image: data ? data.image : "",
        country: data ? data.country : "",
        description: data ? data.description : "",
        price: data ? data.price : ""
    }
    const { handleSubmit, control, formState: { errors } } = useForm({ defaultValues })
    const onSubmit = data => { onClose(); onUpdate(data) }

    console.log(errors)
    return (
        <Container>
            <h1>Stamp Form</h1>
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
                </Grid>
                <Box className={classes.buttonsBox}>
                    <Button type="button" variant="outlined" className={classes.cancelButton} onClick={()=>{onClose && onClose()}} >Cancel</Button>
                    <Button type="submit" variant="outlined" className={classes.saveButton}>Submit</Button>
                </Box>
            </form>
        </Container>
    )
}

export default StampForm
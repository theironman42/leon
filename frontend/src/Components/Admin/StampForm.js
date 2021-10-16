import { Box, Button, Container, Grid } from '@material-ui/core'
import React from 'react'
import { useForm, FormProvider } from "react-hook-form"
import { makeStylesGlobal } from '../../theme/GlobalTheme'
import { ControlTextField } from '../ControlFields'
import Dropzone from '../Dropzone'

const useStyles = makeStylesGlobal(()=>{})

function StampForm({
    data,
    onClose,
    isNew,
    onUpdate,
}) {
    const classes = useStyles()
    const defaultValues = {
        name: data ? data.name : "",
        country: data ? data.country : "",
        description: data ? data.description : "",
        price: data ? data.price : "",
        reference: data ? data.reference : "",
        images: data ? data.images : []
    }
    const methods = useForm({ defaultValues })
    const { handleSubmit, control, formState: { errors } } = methods
    const onSubmit = formData => { onClose(); onUpdate({...data, ...formData}) }

    console.log(classes)
    return (
        <Container>
            <h1>Stamp Form</h1>
            <FormProvider {...methods} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <ControlTextField name="name" control={control} required={true} label="Name" fullWidth={true} error={!!errors.name} />
                        </Grid>
                        <Grid item xs={12}>
                            <ControlTextField name="reference" control={control} label="Ref" fullWidth={true} />
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
                            <Dropzone
                                name="images"
                                accept="image/png, image/jpg, image/jpeg"
                                isNew={isNew}
                                images={data && data.images}
                            />
                        </Grid>
                    </Grid>
                    <Box className={classes.buttonsBox}>
                        <Button type="button" variant="outlined" className={classes.cancelButton} onClick={() => { onClose && onClose() }} >Cancel</Button>
                        <Button type="submit" variant="outlined" className={classes.saveButton}>Submit</Button>
                    </Box>
                </form>
            </FormProvider>
        </Container>
    )
}

export default StampForm

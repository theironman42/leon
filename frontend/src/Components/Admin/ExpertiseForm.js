import { Box, Button, Container, Grid } from '@material-ui/core'
import React from 'react'
import { useForm, FormProvider } from "react-hook-form"
import { makeStylesGlobal } from '../../theme/GlobalTheme'
import { ControlTextField } from '../ControlFields'
import Dropzone from '../Dropzone'

const useStyles = makeStylesGlobal(() => { })

function ExpertiseForm({
    data,
    onClose,
    isNew,
    onUpdate,
}) {
    const classes = useStyles()
    const defaultValues = {
        description: data ? data.description : "",
        reference: data ? data.reference : "",
        image: data ? [data.image] : undefined,
    }
    const methods = useForm({ defaultValues })
    const { handleSubmit, control } = methods
    const onSubmit = formData => { onClose(); onUpdate({ ...data, ...formData }) }

    console.log(classes)
    return (
        <Container>
            <h1>Expertise Form</h1>
            <FormProvider {...methods} >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <ControlTextField name="reference" control={control} label="Ref" fullWidth={true} />
                        </Grid>
                        <Grid item xs={12}>
                            <ControlTextField name="description" control={control} label="Description" fullWidth={true} />
                        </Grid>
                        <Grid item xs={12}>
                            <Dropzone
                                oneOnly
                                name="image"
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

export default ExpertiseForm

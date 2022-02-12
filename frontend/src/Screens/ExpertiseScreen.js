import { Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStylesGlobal } from '../theme/GlobalTheme'
import { getData } from '../Utils/backend'

const useStyles = makeStylesGlobal((theme) => ({
    expertiseTitle: {
        margin: "5vh"
    },
    expertiseImage: {
        maxHeight: '80vh',
        width: 'auto',
        [theme.breakpoints.down('md')]: {
            maxWidth: '80vw',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '45vw',
        },
        marginBottom: '5em'
    },
    expertiseGrid: {
        marginBottom: '15em'

    }
}))

function ExpertiseScreen(props) {
    const id = props.match.params.id
    const [expertise, setExpertise] = useState()
    const classes = useStyles()

    useEffect(() => {
        if (!id) {
            props.history.push("/")
        } else {
            getData(`/api/expertise/${id}`).then((res) => setExpertise(res.data))
        }
        return () => {

        }
    }, [id, props.history])

    return expertise ? (
        <Container>
            <Grid container className={classes.expertiseGrid} spacing={3}>
                <Grid item xs={12}>
                    <Typography className={classes.expertiseTitle} variant='h3' >Expertise {expertise.reference} </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img
                        src={expertise.image}
                        alt='expertise'
                        className={classes.expertiseImage}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography className={classes.expertiseTitle} variant='h6' >Description </Typography>
                    <p>
                        {expertise.description}
                    </p>
                </Grid>
            </Grid>
        </Container>
    ) :
        (
            <div>Loading ...</div>
        )
}

export default ExpertiseScreen

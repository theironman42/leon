import { Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStylesGlobal } from '../theme/GlobalTheme'
import { getData } from '../Utils/backend'

const useStyles = makeStylesGlobal(()=>({
    pageTitle:{
        marginTop: "3em"
    }
}))



function ExpertiseListing() {
    const classes = useStyles()
    const [expertiseList, setExpertiseList] = useState(undefined)

    useEffect(() => {
        getData("/api/expertise").then((res)=>setExpertiseList(res.data.data))
        return () => {
            
        }
    }, [])
    return (
        <Container>
        <Typography variant='h4' className={classes.pageTitle} >Expertises</Typography>
        <Grid container>
            {expertiseList && expertiseList.map((item, index)=>(
                <Grid item xs={12} sm={6}>
                    {item.reference}
                    </Grid>
            ))}
        </Grid>
        </Container>
    )
}

export default ExpertiseListing

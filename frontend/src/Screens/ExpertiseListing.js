import { Card, CardContent, CardMedia, Container, Grid, TablePagination, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStylesGlobal } from '../theme/GlobalTheme'
import { getData } from '../Utils/backend'

const useStyles = makeStylesGlobal(() => ({
    pageTitle: {
        marginTop: "3em"
    },
    expertiseImage: {
        height: '40vh',
        width: 'auto',
        marginLeft: "auto",
        marginRight: "auto"
    }
}))



function ExpertiseListing(props) {
    const classes = useStyles()
    const [expertiseList, setExpertiseList] = useState(undefined)
    const urlParams = new URLSearchParams(props.location.search)
    const pageNumber = (urlParams && urlParams.get('pageNumber')) || 1
    

    useEffect(() => {
        getData(`/api/expertise?pageSize=8&pageNumber=${pageNumber}`).then((res) => setExpertiseList(res.data))
        return () => {

        }
    }, [pageNumber])
    return expertiseList?(
        <Container>
            <Typography gutterBottom variant='h4' className={classes.pageTitle} >Expertises</Typography>
            <Grid container spacing={3}>
                {expertiseList && expertiseList.data.map((item, index) => (
                    <Grid item xs={12} md={6} key={index}>
                        <Card onClick={() => props.history.push(`/expertise/${item._id}`)}>
                            <CardMedia
                                component='img'
                                title="expertise"
                                image={item.image}
                                className={classes.expertiseImage}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.reference}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <TablePagination
            rowsPerPageOptions={[]}
                component="div"
                rowsPerPage={8}
                count={expertiseList.total}
                page={expertiseList.page}
                onChangePage={(event, newPage)=>{props.history.push(`/?pageNumber=${newPage+1}`)}}
            />
        </Container>
    ) :
    (
        <div>LOADING . . .</div>
    )
}

export default ExpertiseListing

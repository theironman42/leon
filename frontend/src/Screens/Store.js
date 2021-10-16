import { Button, Card, CardActions, CardContent, CardMedia, Typography, Grid, Container, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStampList } from '../actions/productActions'
import { makeStylesGlobal } from '../theme/GlobalTheme'
const useStyles = makeStylesGlobal(theme => ({
    cardMedia: {
        height: "20vh",
        width: 'auto',
        marginLeft: "auto",
        marginRight: "auto"
    },
    productCardContent: {
        whiteSpace:"nowrap",
        overflow:"hidden",
        textOverflow: "ellipsis",
        height: "2vh",
        marginTop: "1em",
        marginBottom: "1em",
        textAlign: "center"
    }
}))

function Store(props) {
    const dispatch = useDispatch()
    const products = useSelector(state => state.productList)
    const { productList } = products
    console.log(props);
    const classes = useStyles(props.theme)

    useEffect(() => {
        if (!productList) {
            const page = (props.params && props.params.pageNumber) || 0
            const pageSize = (props.params && props.params.pageSize) || 16
            dispatch(getStampList(page, pageSize))
        }
    }, [dispatch, productList, props.params])


    const productCard = (product) => {

        return (
            <Card key={product._id} >
                <CardMedia
                    component="img"
                    image={product.images && product.images[0]}
                    alt="product image"
                    className={classes.cardMedia}
                />
                <CardContent >
                    <Typography className={classes.productCardContent} > {product.name} </Typography>
                </CardContent>
                <CardActions>
                    <Button variant='outlined' onClick={()=>props.history.push(`/product/${product._id}`)} fullWidth>
                        See More
                    </Button>
                </CardActions>
            </Card>
        )
    }

    const storePage = (products) => {
        return products.map((item, index) => <>
            <Grid item key={index} xs={12} sm={4} md={3} lg={2}  >
                {productCard(item)}
            </Grid>
        </>)
    }

    return (
        <Container>
            <Grid container spacing={3}>
                {productList && productList.data.length > 0 && storePage(productList.data)}
            </Grid>
        </Container>
    )
}

export default Store

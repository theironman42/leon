import { Button, Card, CardActions, CardContent, CardMedia, Typography, Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStampList } from '../actions/productActions'
import { getData } from '../Utils/backend'
import StampsAdmin from './Admin/StampAdmin'

function Store(props) {
    const dispatch = useDispatch()
    const products = useSelector(state => state.productList)
    const { productList } = products

    useEffect(() => {
        if (!productList) {
            const page = (props.params && props.params.pageNumber) || 0
            const pageSize = (props.params && props.params.pageSize) || 16
            dispatch(getStampList(page, pageSize))
        }
    }, [dispatch, productList, props.params])


    const productCard = (product) => {

        return (
            <Card key={product._id}>
                <CardMedia
                    component="img"
                    style={{ height: "25vh", width: 'auto' }}
                    image={product.images && product.images[0]}
                    alt="product image"
                />
                <CardContent>
                    <Typography > {product.name} </Typography>
                </CardContent>
                <CardActions>
                    <Button variant='outlined' fullWidth>
                        See More
                    </Button>
                </CardActions>
            </Card>
        )
    }

    const storePage = (products) => {
        return products.map((item, index) => <>
            <Grid item key={index} xs={12} sm={6} md={3}  >
                {productCard(item)}
            </Grid>
        </>)
    }

    return (
        <Grid container spacing={3}>
            {productList && productList.data.length > 0 && storePage(productList.data)}
        </Grid>
    )
}

export default Store

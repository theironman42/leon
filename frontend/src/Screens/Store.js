import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
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
        console.log(productList)
        if (!productList) {
            const page = (props.params && props.params.pageNumber) || 0
            const pageSize = (props.params && props.params.pageSize) || 16
            dispatch(getStampList(page, pageSize))
        }
    }, [dispatch, productList, props.params])


    const productCard = (product) => {
        
        return (
            <Card key={product._id} style={{height: "50vh"}}>
                <CardMedia
                    component="img"
                    style={{height: "25vh", width: 'auto'}}
                    image={product.images && product.images[0]}
                    alt="product image"
                />
                <CardContent>
                    <Typography > {product.name} </Typography>
                </CardContent>
                <CardActions>
                    <Button variant='outlined' fullWidth>
                        HELLO
                    </Button>
                </CardActions>
            </Card>
        )
    }

    return (
        <div>
            {productList && productList.data.length > 0 && productList.data.map((item, index) => <>{productCard(item)}<br /></>)}
        </div>
    )
}

export default Store

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Typography, } from '@material-ui/core';
import { makeStylesGlobal } from '../theme/GlobalTheme';
import { putData } from '../Utils/backend';
import { useSelector } from 'react-redux';



const useStyles = makeStylesGlobal(theme => ({
    smallImages: {
        maxHeight: "10vh",
        maxWidth: "10vh"
    },
    bigImage: {
        height: "50vh",
        maxWidth: "60vh"
    },
    ImagesGrid: {
        maxWidth: "60vh",
        textAlign: "center",

    },
    putInCart: {
        padding: "12px",
        textAlign: "center",
        border: "solid 1px",
        maxWidth: '40vw',
        margin: "0 auto"
    },
    putInCartItems: {
        margin: "24px"
    }
}))

function ProductScreen({ match, history }) {
    const classes = useStyles()
    const id = match.params.id
    const [product, setProduct] = useState()
    const [bigImage, setBigImage] = useState()
    const userLogin = useSelector(state => state.userLogin)
    const token = userLogin && userLogin.userInfo && userLogin.userInfo.token
    useEffect(() => {
        axios
            .get(`/api/stamps/${id}`)
            .then(res => {
                setProduct(res.data);
                setBigImage(res.data.images[0])
            })
            .catch(err => console.error(err));
        return () => {

        }
    }, [id])

    function putInCartHandler() {
        if (token) {
            putData('/api/cart', { productId: id }, token)
        }else{
            history.push(`/login?redirect=product/${id}`)
        }
    }

    return !product ? <div>loading</div> :
        <Container>
            <h1>{product.name}</h1>
            <Grid container>
                <Grid item xs={12} md={8}>
                    <Grid container className={classes.ImagesGrid}>
                        <Grid item xs={12}>
                            <img
                                className={classes.bigImage}
                                src={bigImage}
                                alt="stamp"
                            />
                        </Grid>

                        {product.images.map((item, index) => (
                            <Grid item xs={2} key={index} onClick={() => setBigImage(item)}>
                                <img
                                    className={classes.smallImages}
                                    src={item}
                                    alt={"stamp" + index}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container className={classes.putInCart}>
                        <Grid item xs={12} className={classes.putInCartItems}>
                            <Typography> {product.name} </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.putInCartItems}>
                            <Typography> Price: ${product.price} </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.putInCartItems}>
                            <Button variant='outlined' onClick={putInCartHandler}> Put in cart </Button>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {product.description}
                </Grid>
            </Grid>
        </Container>

}

export default ProductScreen

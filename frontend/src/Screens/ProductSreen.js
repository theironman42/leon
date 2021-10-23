import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, Typography, } from '@material-ui/core';
import { makeStylesGlobal } from '../theme/GlobalTheme';


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
        maxWidth:'40vw',
        margin: "0 auto"
    },
    putInCartItems: {
        margin: "24px"
    }
}))

function ProductScreen({ match }) {
    const classes = useStyles()
    const id = match.params.id
    const [product, setProduct] = useState()
    const [bigImage, setBigImage] = useState()

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


    const putInCart = () => (
        <Grid container className={classes.putInCart}>
            <Grid item xs={12} className={classes.putInCartItems}>
                <Typography> {product.name} </Typography>
            </Grid>
            <Grid item xs={12} className={classes.putInCartItems}>
                <Typography> Price: ${product.price} </Typography>
            </Grid>
            <Grid item xs={12} className={classes.putInCartItems}>
                <Button variant='outlined'> Put in cart </Button>
            </Grid>

        </Grid>
    )

    return !product ? <div>loading</div> :
        <Container>
            ProductScreen of {product.name}
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
                    {putInCart()}
                </Grid>
            </Grid>
        </Container>

}

export default ProductScreen

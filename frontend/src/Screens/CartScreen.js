import { Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStylesGlobal } from '../theme/GlobalTheme'
import { getData } from '../Utils/backend'
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStylesGlobal((theme) => ({
    productImages: {
        maxHeight: "10vh",
        maxWidth: "10vw"
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
    },
    productList:{
        border: "solid 1px",
    },
    gridContainer:{
        margin: "24px"
    }
}))

function CartScreen(props) {
    const classes = useStyles()
    const { history } = props
    const [cart, setCart] = useState()
    const userLogin = useSelector(state => state.userLogin)
    const token = userLogin && userLogin.userInfo && userLogin.userInfo.token
    useEffect(() => {
        if (!userLogin) {
            history.push(`/login?redirect=cart`)
        }
        if (!cart) {
            getData('/api/cart', token).then((res) => setCart(res.data))
        }
        return () => {
        }
    }, [cart, history, token, userLogin])

    console.log(cart)
    return (
        <div>
            <h1>Cart</h1>
            {cart &&
                <Grid className={classes.gridContainer} container>
                    <Grid item className={classes.productList} xs={12} md={6}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: '10%' }}> Products</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell style={{ width: '5%' }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        cart.products.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell style={{ width: '10%' }} ><img className={classes.productImages} src={item.images[0]} alt="stamp" /></TableCell>
                                                <TableCell >{item.name}</TableCell>
                                                <TableCell align='right'>${Number(item.price).toFixed(2)}</TableCell>
                                                <TableCell style={{ width: '5%' }} ><Button onClick={()=>console.log("removed")} > <ClearIcon /> </Button></TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        {/* <Grid container>
                        {cart.products.map((item, index) => (<Grid item xs={12} key={index}>{item.name}</Grid>))}
                    </Grid> */}
                    </Grid>
                    <Grid item xs={0} md={1} >
                        
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container className={classes.putInCart}>
                        <Grid item xs={12} className={classes.putInCartItems}>
                            <Typography> TOTAL </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.putInCartItems}>
                            <Typography> Price: ${cart.total} </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.putInCartItems}>
                            <Button variant='outlined' onClick={()=>{console.log("placeOeder")}}> Order </Button>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                }
        </div>
    )
}

export default CartScreen

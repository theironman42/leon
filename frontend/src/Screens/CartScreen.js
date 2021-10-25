import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getData } from '../Utils/backend'

function CartScreen(props) {

    const { history } = props
    const [cart, setCart] = useState()
    const userLogin = useSelector(state => state.userLogin)
    const token = userLogin && userLogin.userInfo && userLogin.userInfo.token
    useEffect(() => {
        if (!userLogin) {
            history.push(`/login?redirect=cart`)
        }
        if (!cart) {
            getData('/api/cart', token).then((res)=>setCart(res.data))
        }
        return () => {
        }
    }, [cart, history, token, userLogin])

    console.log(cart)
    return (
        <div>
            <h1>Cart</h1>
            { cart && 
            <Grid container>
                <Grid item>
                    <Grid container>
                        {cart.products.map((item, index) => (<Grid item xs={12} key={index}>{item.name}</Grid>))}
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container></Grid>
                </Grid>
            </Grid>}
        </div>
    )
}

export default CartScreen

import React from 'react'
import { Route, Switch } from 'react-router'
import Navbar from '../Components/NavBar'
import PrivateRoute from './PrivateRoute'
import Store from '../Screens/Store'
import RegisterUser from '../Screens/RegisterUser'
import LoginUser from '../Screens/LoginUser'
import ProfileScreen from '../Screens/ProfileScreen'
import AdminRoutes from './AdminRoutes'
import ProductScreen from '../Screens/ProductSreen'
import CartScreen from '../Screens/CartScreen'
import ExpertiseListing from '../Screens/ExpertiseListing'
import HeadToolBar from '../Components/HeadToolbar'
import { CssBaseline } from '@material-ui/core'
import ExpertiseScreen from '../Screens/ExpertiseScreen'
import Logout from '../Screens/Logout'

function AppRoutes(props) {
    return (
        <>
        <CssBaseline />
        <HeadToolBar />
        {/* <Navbar /> */}
        <Switch>
          <Route path="/register" component={RegisterUser} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/login" component={LoginUser} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute path="/admin" authorized={['SELLER','ADMIN']} component={AdminRoutes} />
          <Route path='/cart' component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/store" component={Store} />
          <Route path="/expertise/:id" component={ExpertiseScreen} />
          <Route path="/" component={ExpertiseListing} />

        </Switch>
        </>
    )
}

export default AppRoutes

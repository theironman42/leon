import React from 'react'
import { Route, Switch } from 'react-router'
import Navbar from '../Components/NavBar'
import PrivateRoute from './PrivateRoute'
import Store from '../Screens/Store'
import RegisterUser from '../Screens/RegisterUser'
import LoginUser from '../Screens/LoginUser'
import ProfileScreen from '../Screens/ProfileScreen'
import AdminRoutes from './AdminRoutes'

function AppRoutes(props) {
    return (
        <>
        <Navbar />
        <Switch>
          <Route path="/register" component={RegisterUser} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/login" component={LoginUser} />
          <PrivateRoute path="/admin" authorized={['SELLER','ADMIN']} component={AdminRoutes} />
          <Route path="/" component={Store} />
          

        </Switch>
        </>
    )
}

export default AppRoutes

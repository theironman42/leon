import React from 'react'
import { Route, Switch } from 'react-router'
import StampsAdmin from '../Screens/Admin/StampAdmin'
import UsersListing from '../Screens/Admin/UsersListing'

function AdminRoutes() {
    return (
        <Switch>
            <Route path="/admin/stamps" component={StampsAdmin} />
            <Route path="/admin/users" component={UsersListing} />
        </Switch>
    )
}

export default AdminRoutes

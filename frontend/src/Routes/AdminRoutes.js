import React from 'react'
import { Route, Switch } from 'react-router'
import StampsAdmin from '../Screens/Admin/StampAdmin'

function AdminRoutes() {
    return (
        <Switch>
            <Route path="/admin/stamps" component={StampsAdmin} />
        </Switch>
    )
}

export default AdminRoutes

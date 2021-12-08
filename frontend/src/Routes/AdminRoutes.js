import React from 'react'
import { Route, Switch } from 'react-router'
import ExpertsAdmin from '../Screens/Admin/ExpertiseAdmin'
import StampsAdmin from '../Screens/Admin/StampAdmin'
import UsersListing from '../Screens/Admin/UsersListing'

function AdminRoutes() {
    return (
        <Switch>
            <Route path="/admin/stamps" component={StampsAdmin} />
            <Route path="/admin/users" component={UsersListing} />
            <Route path="/admin/expertise" component={ExpertsAdmin} />
        </Switch>
    )
}

export default AdminRoutes

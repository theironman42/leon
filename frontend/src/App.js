import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Components/NavBar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Store from './Screens/Store'
import StampsAdmin from './Screens/Admin/StampAdmin'
import RegisterUser from './Screens/RegisterUser'
import LoginUser from './Screens/LoginUser'
import ProfileScreen from './Screens/ProfileScreen'

function App(props) {


  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/register" component={RegisterUser} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/login" component={LoginUser} />
          <Route path="/admin/stamps" component={StampsAdmin} />
          <Route path="/" component={Store} />

        </Switch>
      </BrowserRouter>

    </>
  );
}

export default App;

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Screens/NavBar'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Store from './Screens/Store'
import StampsAdmin from './Screens/Admin/StampAdmin'

function App() {


  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Switch>
          
          <Route path="/admin/stamps"><StampsAdmin /></Route>
          <Route path="/"><Store /></Route>

        </Switch>
      </BrowserRouter>

    </>
  );
}

export default App;

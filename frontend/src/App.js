import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes/AppRoutes';


function App(props) {


  return (
    <>

      <BrowserRouter>
        <AppRoutes {...props}/>
      </BrowserRouter>

    </>
  );
}

export default App;

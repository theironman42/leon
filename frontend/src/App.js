import { ThemeProvider } from '@material-ui/core';
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes/AppRoutes';
import { GlobalTheme } from './theme/GlobalTheme';


function App(props) {


  return (
    <>
      <ThemeProvider theme={GlobalTheme}>
        <BrowserRouter>
          <AppRoutes {...props} />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

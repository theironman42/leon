import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Home from './Screens/Home'
import { BrowserRouter } from 'react-router-dom'

function App() {

  const [val, setVal] = useState()
  useEffect(() => {
    axios.get('/test').then((res) => setVal(res.data))
  }, [])

  return (
    <>
      <h1>Welcome to victoire 1</h1>
      {val}
      <BrowserRouter>
      <Home></Home>
      </BrowserRouter>
      
    </>
  );
}

export default App;

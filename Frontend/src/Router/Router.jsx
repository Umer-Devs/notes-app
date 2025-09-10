import React from 'react';
import {BrowserRouter, Route, Routes}  from 'react-router-dom';
import { Login, Singnup } from '../Forms';

const Router = () => {
  return (
   <>
      
  <BrowserRouter>
   
   <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/sign-up' element={<Singnup/>} />
   </Routes>

  </BrowserRouter>  

   </>
  )
}

export default Router

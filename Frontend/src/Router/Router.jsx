import React from 'react';
import {BrowserRouter, Route, Routes}  from 'react-router-dom';
import { Login, Singnup } from '../Forms';
import { Notes } from '../pages';

const Router = () => {
  return (
   <>
      
  <BrowserRouter>
   
   <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/sign-up' element={<Singnup/>} />
    <Route path='/note' element={<Notes/>} />
   </Routes>

  </BrowserRouter>  

   </>
  )
}

export default Router

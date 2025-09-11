import React from 'react';
import {BrowserRouter, Route, Routes}  from 'react-router-dom';
import { Login, Singnup } from '../Forms';
import { Notes } from '../pages';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';

const Router = () => {
  return (
   <>
      
  <BrowserRouter>
   
   <Routes>
    <Route path='/login' element={<Login/>} />
    <Route path='/sign-up' element={<Singnup/>} />
    <Route path='/' element={
      
      <ProtectedRoutes>
      
      <Notes/>
      
      </ProtectedRoutes>
      } 
      
      
      
      />
   </Routes>

  </BrowserRouter>  

   </>
  )
}

export default Router

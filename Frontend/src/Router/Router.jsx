import React from 'react';
import {BrowserRouter, Route, Routes}  from 'react-router-dom';
import { Login, Singnup } from '../Forms';
import { CreateNotes, Notes } from '../pages';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import EditNotes from '../pages/EditNotes/EditNotes';

const Router = () => {
  return (
   <>
      
  <BrowserRouter>
   
   <Routes>
    <Route path='/login' element={<Login/>} />
    <Route path='/sign-up' element={<Singnup/>} />
    <Route path='/create-notes' element={<CreateNotes/>} />
    <Route path='/edit-notes/:id' element={<EditNotes/>} />
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

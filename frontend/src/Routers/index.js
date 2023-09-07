import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from '../pages/Navbar';

import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';

import PopularMovies from '../pages/PopularMovies';
import MovieDetail from '../pages/MovieDetail';
import SearchResult from '../pages/SearchResult';

import NotFound from '../pages/NotFound';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route index element={<PopularMovies />} />
          <Route path='movie/:id' element={<MovieDetail />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='profile' element={<Profile />} />
          <Route path='edit_profile' element={<EditProfile />} />
          <Route path='search/:search' element={<SearchResult />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;

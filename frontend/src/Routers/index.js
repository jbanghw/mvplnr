import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from '../Components/Navbar';
// import Navbar from '../Components/Navbar/Profile';

import Register from '../Components/Accounts/Register';
import Login from '../Components/Accounts/Login';
import Profile from '../Components/Accounts/Profile';
import EditProfile from '../Components/Accounts/EditProfile';

import PopularMovies from '../Components/Movies/PopularMovies';
import MovieDetail from '../Components/Movies/MovieDetail';
import SearchResult from '../Components/Movies/SearchResult';

import NotFound from '../Components/NotFound';
import MovieListItem from '../Components/Movies/MovieListItem';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />}>
          <Route path='/' element={<PopularMovies />} />
          <Route path='movie_list_item' element={<MovieListItem movie_id={'tt0110413'} title={'LEON'} description={'KEKW'} poster={'https://m.media-amazon.com/images/M/MV5BYTUxYjczMWUtYzlkZC00NTcwLWE3ODQtN2I2YTIxOTU0ZTljXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_Ratio0.6716_AL_.jpg'} />} />
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

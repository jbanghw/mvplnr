import { Grid, Divider, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MovieListItem from '../../components/Movies/MovieListItem';

export default function PopularMovies() {
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      await fetch (`http://localhost:8000/movies/popular/`, {
        method: 'GET',
      })
      .then(res => {
        return res.json();
      })
      .then(json => {
        if ('items' in json) {
          setMovies(json['items']);
        }
      });
    };
    fetchPopularMovies();
  }, []);

  if (movies) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <Grid
          container
          spacing={2}
          direction={'row'}
          sx={{
            my: '20px',
            maxWidth: '50rem'
          }}
        >
          {
            movies.slice(0, 12).map(movie => (
              <Grid item xs={12} key={movie['id']}>
                <MovieListItem
                  movie_id={movie['id']}
                  title={movie['title']}
                  poster={movie['image']}
                  description={movie['crew']}
                />
                <Divider
                  orientation="horizontal"
                  flexItem
                  sx={{
                    mt: '10px',
                  }}
                />
              </Grid>
            ))
          }
        </Grid>
      </Box>
    );
  } else {
    return <></>
  }
};
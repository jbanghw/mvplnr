import { Stack, Grid, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MovieListItem from '../MovieListItem';

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
      <>
        <Stack
          position={'absolute'}
          left={'15%'}
          right={'15%'}
          alignItems={'center'}
          divider={<Divider orientation='horizontal' />}
        >
          <Grid container spacing={2}>
            {
              movies.slice(0, 12).map(movie => (
                <Grid item xs={12} key={movie['id']}>
                  <MovieListItem
                    movie_id={movie['id']}
                    title={movie['title']}
                    poster={movie['image']}
                    description={movie['crew']}
                  />
                </Grid>
              ))
            }
          </Grid>
        </Stack>
      </>
    );
  } else {
    return <></>
  }
};
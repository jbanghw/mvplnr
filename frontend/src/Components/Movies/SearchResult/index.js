import { Stack, Grid, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieListItem from '../MovieListItem';

export default function SearchResult() {
  let { search } = useParams();
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchSearchResults = async () => {
      await fetch (`http://localhost:8000/movies/search/?search=${search}`, {
        method: 'GET',
      })
      .then(res => {
        return res.json();
      })
      .then(json => {
        if ('results' in json) {
          setMovies(json['results']);
        }
      });
    };
    fetchSearchResults();
  }, [search])

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
              movies.map(movie => (
                <Grid item xs={12} key={movie['id']}>
                  <MovieListItem
                    movie_id={movie['id']}
                    title={movie['title']}
                    poster={movie['image']}
                    description={movie['description']}
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
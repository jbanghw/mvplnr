import { Grid, Divider, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieListItem from '../../components/Movies/MovieListItem';

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
            maxWidth: '50rem',
          }}
        >
          {
            movies.map(movie => (
              <Grid item xs={12} key={movie['id']}>
                <MovieListItem
                  movie_id={movie['id']}
                  title={movie['title']}
                  poster={movie['image']}
                  description={movie['description']}
                />
                <Divider
                  orientation='horizontal'
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
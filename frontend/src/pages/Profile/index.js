import React, { useEffect, useState  } from 'react';
import { Stack, Pagination, Grid, ToggleButtonGroup, ToggleButton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MovieList from "./List";


export default function Profile() {
  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [titleFilter, setTitleFilter] = useState('');
  const [dateOrder, setDateOrder] = useState(true);
  const [watchedFilter, setWatchedFilter] = useState(2);
  const [entryChanged, setEntryChanged] = useState(false);
  const perPage = 10;
  const navigate = useNavigate();

  /*
    filters and searches
  */
  const handleWatchedFilterChange = (e, newWatchedFilter) => {
    setWatchedFilter(newWatchedFilter);
  };
  const changeTitleFilter = (newValue) => {
    setTitleFilter(newValue.currentTarget.value);
    setCurrentOffset(0);
    setCurrentPage(1);
  };


  /*
    page change
  */
  const handlePageChange = (e, page) => {
    setCurrentOffset(page - 1);
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!localStorage.getItem('access')) {
      navigate('/login');
    }

    const fetchMovies = async () => {
      let url = `http://localhost:8000/accounts/movies/?title_filter=${titleFilter}&watched=${watchedFilter}&limit=${perPage}&offset=${0 + perPage * currentOffset}&date_order=${dateOrder ? '1' : '0'}`;
      await fetch (url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
        }
      })
      .then(res => {
        if (res.status === 401) {
          navigate('/login');
        }
        return res.json();
      })
      .then(json => {
        if (localStorage.getItem('access')) {
          setPageCount(Math.ceil(json.count / perPage));
          setMovies(json.results);
        }
      })
    };
    if (localStorage.getItem('access')) {
      fetchMovies();
    }
  }, [currentPage, currentOffset, navigate, dateOrder, watchedFilter, titleFilter, entryChanged]);

  return (
    <>
      <Stack
        position={'absolute'}
        direction={'column'}
        left={'15%'}
        right={'15%'}
        alignItems={'center'}
        justifyContent={'space-between'}
        spacing={2}
        pt={3}
      >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <ToggleButtonGroup
                color='primary'
                value={watchedFilter}
                exclusive
                onChange={handleWatchedFilterChange}
              >
                <ToggleButton value={0}>Unwatched</ToggleButton>
                <ToggleButton value={2}>All</ToggleButton>
                <ToggleButton value={1}>Watched</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <TextField
                label='Filter by Title'
                onChange={changeTitleFilter}
                size='small'
              />
            </Grid>
          </Grid>
          <MovieList
            movies={movies}
            dateOrder={dateOrder}
            setDateOrder={setDateOrder}
            entryChanged={entryChanged}
            setEntryChanged={setEntryChanged}
          />
        <Pagination
          count={pageCount}
          color='primary'
          page={currentPage}
          onChange={(event, page) => handlePageChange(event, page)}
        />
      </Stack>
    </>
  )
};
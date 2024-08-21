import { Grid, Typography, Divider, Button, Snackbar, IconButton, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const MovieDetail = () => {
  let { id } = useParams();
  const [detail, setDetail] = useState();
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();
  const img_style = { margin: 'auto', display: 'block', maxWidth: '150px', maxHeight: '150px' }
  /*
    snack bars for adding/removing movies to list
  */
  // added
  const [addedSnackBarOpen, setAddedSnackBarOpen] = useState(false);
  const handleAddedSnackBarClose = () => {
    setAddedSnackBarOpen(false);
  };
  const addedSnackBarAction = (
    <IconButton
      size='small'
      aria-label='close'
      color='inherit'
      onClick={handleAddedSnackBarClose}
    >
      <CloseIcon fontSize='small' />
    </IconButton>
  );
  // removed
  const [removedSnackBarOpen, setRemovedSnackBarOpen] = useState(false);
  const handleRemovedSnackBarClose = () => {
    setRemovedSnackBarOpen(false);
  };
  const removedSnackBarAction = (
    <IconButton
      size='small'
      aria-label='close'
      color='inherit'
      onClick={handleRemovedSnackBarClose}
    >
      <CloseIcon fontSize='small' />
    </IconButton>
  );

  /*
    adding/removing movies to list
  */
  // adding
  const handleAddToList = () => {
    if (localStorage.getItem('access')) {
      const addToList = async () => {
        fetch(`${global.config.BACKEND_SERVER}${global.config.BACKEND_PORT}/accounts/add_movie/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
          },
          body: JSON.stringify({ movie_id: id })
        })
      };
      addToList();
      setIsAdded(true);
      setAddedSnackBarOpen(true);
    } else {
      navigate('/login');
    }
  }
  // removing
  const handleRemoveFromList = () => {
    if (localStorage.getItem('access')) {
      const removeFromList = async () => {
        fetch(`${global.config.BACKEND_SERVER}${global.config.BACKEND_PORT}/accounts/remove_movie/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
          },
          body: JSON.stringify({ movie_id: id })
        })
      };
      removeFromList();
      setIsAdded(false);
      setRemovedSnackBarOpen(true);
    }
  }

  useEffect(() => {
    const fetchMovieDetail = async() => {
      await fetch (`${global.config.BACKEND_SERVER}${global.config.BACKEND_PORT}/movies/movie/?id=${id}`, {
        method: 'GET',
      })
      .then(res => {
        return res.json();
      })
      .then(json => {
        setDetail(json)
      });
    };
    fetchMovieDetail();
    const fetchIsAdded = async() => {
      await fetch (`http://localhost:8000/accounts/is_added/?id=${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
        }
      })
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json['movie_id']) {
          setIsAdded(true);
        }
      })
    };
    if (localStorage.getItem('access')) {
      fetchIsAdded();
    }
  }, [id]);


  if (detail) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Grid container spacing={2} direction={'row'} sx={{ my: '20px', maxWidth: '60rem' }}>
          <Grid item xs={5}>
            <Box sx={{ width: '25rem', height: '25rem', }}>
              <img src={ `${global.config.TMDB_POSTER_PATH}${detail['poster_path']}` } sx={{ maxHeight: '150px', maxWidth: '150px'}}  alt='movie poster'/>
            </Box>
          </Grid>
          <Grid container item xs={7} direction={'column'} justifyContent='flex-start' alignItems='flex-start' spacing={2}>
            <Grid item>
              <Typography variant='h5'>
                {detail['title']}
              </Typography>
              <Divider orientation='horizontal' flexItem />
            </Grid>
            <Grid item>
              <Typography
                variant='body1'
                sx={{ fontFamily: 'monospace' }}
              >
                {detail['year']}
                {detail['runtimeStr'] ? ' · ' + detail['runtimeStr'] : ''}
              </Typography>
              <Divider orientation='horizontal' flexItem />
            </Grid>
            <Grid item>
              <Typography
                variant='body1'
                sx={{ fontFamily: 'monospace' }}
              >
                Directors: {detail['directors']}
              </Typography>
              <Divider orientation='horizontal' flexItem />
            </Grid>
            <Grid item>
              <Typography
                variant='body1'
                sx={{ fontFamily: 'monospace' }}
              >
                Stars: {detail['stars']}
              </Typography>
              <Divider orientation='horizontal' flexItem />
            </Grid>
            <Grid item>
              <Typography
                variant='body2'
                sx={{ fontFamily: 'monospace' }}
              >
                {detail['plot']}
              </Typography>
            </Grid>
            {
              localStorage.getItem('access') && isAdded
                ?
                <Grid item alignSelf={'flex-end'}>
                  <Button variant='text' onClick={handleRemoveFromList}>
                    <Typography
                      sx={{ cursor: 'pointer', fontFamily: 'monospace', }}
                      variant='body2'
                    >
                      Remove from List
                    </Typography>
                  </Button>
                  <Divider orientation='horizontal' flexItem />
                </Grid>
                :
                <Grid item alignSelf={'flex-end'}>
                  <Button variant='text' onClick={handleAddToList}>
                    <Typography
                      sx={{ cursor: 'pointer', fontFamily: 'monospace', }}
                      variant='body2'
                    >
                      Add to List
                    </Typography>
                  </Button>
                  <Divider orientation='horizontal' flexItem />
                </Grid>
            }
          </Grid>
        </Grid>
        <Snackbar
          open={addedSnackBarOpen}
          message='Movie Added'
          autoHideDuration={4000}
          onClose={handleAddedSnackBarClose}
          action={addedSnackBarAction}
        />
        <Snackbar
          open={removedSnackBarOpen}
          message='Movie Removed'
          autoHideDuration={4000}
          onClose={handleRemovedSnackBarClose}
          action={removedSnackBarAction}
        />
      </Box>
    )
  } else {
    return <></>
  }
};

export default MovieDetail;
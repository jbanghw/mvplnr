import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Snackbar } from '@mui/material';
import { Typography, Link, IconButton } from '@mui/material';
import { useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CloseIcon from '@mui/icons-material/Close';

const MovieList = ({ movies, dateOrder, setDateOrder, entryChanged, setEntryChanged }) => {
  /*
    snack bars for changes
  */
  // watch
  const [watchSnackBarOpen, setWatchSnackBarOpen] = useState(false);
  const handleWatchSnackBarClose = () => {
    setWatchSnackBarOpen(false);
  };
  const watchSnackBarAction = (
    <IconButton
      size='small'
      color='inherit'
      onClick={handleWatchSnackBarClose}
    >
      <CloseIcon fontSize='small' />
    </IconButton>
  );
  // unwatch
  const [unwatchSnackBarOpen, setUnwatchSnackBarOpen] = useState(false);
  const handleUnwatchSnackBarClose = () => {
    setUnwatchSnackBarOpen(false);
  };
  const unwatchSnackBarAction = (
    <IconButton
      size='small'
      color='inherit'
      onClick={handleUnwatchSnackBarClose}
    >
      <CloseIcon fontSize='small' />
    </IconButton>
  );
  // remove
  const [removeSnackBarOpen, setRemoveSnackBarOpen] = useState(false);
  const handleRemoveSnackBarClose = () => {
    setRemoveSnackBarOpen(false);
  };
  const removeSnackBarAction = (
    <IconButton
      size='small'
      color='inherit'
      onClick={handleRemoveSnackBarClose}
    >
      <CloseIcon fontSize='small' />
    </IconButton>
  );
  

  /*
    changes to entries
  */
  // removed
  const handleRemove = (movie_id) => {
    fetch('http://localhost:8000/accounts/remove_movie/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'movie_id': movie_id,
      }),
    })
    .then((res) => {
      setRemoveSnackBarOpen(true);
      setEntryChanged(!entryChanged);
    })
  };
  // watched/unwatched
  const handleWatchChange = (movie_id, watched) => {
    let url;
    if (watched) {
      url = 'http://localhost:8000/accounts/unwatch_movie/';
    } else {
      url = 'http://localhost:8000/accounts/watch_movie/'
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'movie_id': movie_id,
      }),
    })
    .then((res) => {
      if (watched) {
        setUnwatchSnackBarOpen(true);
      } else {
        setWatchSnackBarOpen(true);
      }
      setEntryChanged(!entryChanged);
    })
  };
  // date order changed
  const handleDateOrderChange = () => {
    setDateOrder(!dateOrder);
  };


  return (
    <>
      <Table sx={{ maxWidth: '100%' }}
        style={{
          tableLayout: 'fixed'
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell width='300px' style={{ fontWeight: 'bold', fontSize: 18 }}>Title</TableCell>
            <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 18 }}>
              Date Added
              <IconButton
                onClick={handleDateOrderChange}
              >
                {dateOrder ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 18 }}>Watched</TableCell>
            <TableCell align='center' style={{ fontWeight: 'bold', fontSize: 18 }}>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((m) => (
            <TableRow
              key={ m.movie_id }
            >
              <TableCell
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  width: '300px',
                  maxWidth: '300px',
                }}
              >
                <Typography>
                  <Link
                    href={`/movie/${m.movie_id}`}
                  >
                    { m.title }
                  </Link>
                </Typography>
              </TableCell>
              <TableCell align='center'>
                { m.added_date.slice(0, 10) }
              </TableCell>
              <TableCell align='center'>
                <IconButton
                  onClick={() => handleWatchChange(m.movie_id, m.watched)}
                >
                  { m.watched ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                </IconButton>
              </TableCell>
              <TableCell align='center'>
                <IconButton
                  onClick={() => handleRemove(m.movie_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Snackbar
        open={watchSnackBarOpen}
        message='Movie Watched'
        autoHideDuration={4000}
        onClose={handleWatchSnackBarClose}
        action={watchSnackBarAction}
      />
      <Snackbar
        open={unwatchSnackBarOpen}
        message='Movie Unwatched'
        autoHideDuration={4000}
        onClose={handleUnwatchSnackBarClose}
        action={unwatchSnackBarAction}
      />
      <Snackbar
        open={removeSnackBarOpen}
        message='Movie Removed'
        autoHideDuration={4000}
        onClose={handleRemoveSnackBarClose}
        action={removeSnackBarAction}
      />
    </>
  )
};

export default MovieList;
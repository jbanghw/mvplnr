import Typography from '@mui/material/Typography';
import { Grid, styled, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const MovieListItem = ({ movie_id, title, poster, description }) => {
  return (
    <Grid container spacing={2} justifyContent={'center'}>
      <Grid item xs={3}>
        <Box sx={{ width: 200, height: 200, }}>
          <Img src={`${global.config.TMDB_POSTER_PATH}${poster}`} />
        </Box>
      </Grid>
      <Grid item xs={9} container>
        <Grid item container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography gutterBottom variant="body2">
              {description}
            </Typography>
          </Grid>
          <Grid item textAlign={'right'} >
            <Link to={`/movie/${movie_id}`}>
              <Button variant='text'>
                <Typography variant="body1">
                  View More
                </Typography>
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieListItem;
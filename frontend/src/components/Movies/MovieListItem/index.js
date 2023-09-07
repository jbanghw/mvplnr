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
    <Grid container spacing={2} maxHeight={'200px'}>
      <Grid item xs={3}>
        <Box sx={{ width: 160, height: 160, }}>
          <Img src={poster} />
        </Box>
      </Grid>
      <Grid item xs={9} container>
        <Grid
          item
          xs
          container
          direction="column"
          spacing={2}
        >
          <Grid item xs>
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                fontFamily: 'monospace',
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              gutterBottom
              sx={{
                fontFamily: 'monospace',
              }}
            >
              {description}
            </Typography>
          </Grid>
          <Grid item textAlign={'right'} >
            <Link to={`/movie/${movie_id}`}>
              <Button variant='text'>
                <Typography
                  sx={{
                    cursor: 'pointer',
                    fontFamily: 'monospace',
                  }}
                  variant="body1"
                >
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
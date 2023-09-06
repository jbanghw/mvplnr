import Typography from '@mui/material/Typography';
import { Grid, Paper, ButtonBase, styled, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const MovieListItem = ({ movie_id, title, poster, description }) => {
  const navigate = useNavigate();

  const handleViewMore = (e) => {
    navigate(`/movie/${movie_id}`);
  };

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 600,
        flexGrow: 1,
        backgroundColor: 'WhiteSmoke'
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img src={poster} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {description}
              </Typography>
            </Grid>
            <Grid item xs textAlign={'right'}>
              <Button variant='text' onClick={handleViewMore}>
                <Typography
                  sx={{ cursor: 'pointer' }}
                  variant="body2"
                >
                  View More
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MovieListItem;
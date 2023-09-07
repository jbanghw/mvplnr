import {
  CssBaseline, Avatar, Button, TextField, Link, Grid, Box, Typography, Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { LoggedinContext } from '../../App';
import './style.css';

const Authorization = ({value}) => {
  if (value) {
    return (
      <>
        <Grid item xs={12}>
          <p style= {{ color: 'red '}}>
            Sorry, please double check your information.
          </p>
        </Grid>
      </>
    );
  } else {
    return <></>
  }
};

export default function Login() {
  const { loggedin, setLoggedin } = useContext(LoggedinContext);

  // error messages for the fields
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authorizationError, setAuthorizationError] = useState(false);
  let allGood = false;

  // redirect to register page
  const navigate = useNavigate();
  const RegisterRedirect = () => {
    navigate('/register');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch('http://localhost:8000/accounts/api/token/', {
      method: 'POST',
      body: data,
    })
    .then(response => {
      if (response.status === 200) {
        allGood = true;
      }
      return response.json();
    })
    .then(response => {
      if (allGood) {
        localStorage.setItem('access', response['access']);
        setLoggedin(response['access']);
        navigate('/');
      } else {
        if ('detail' in response) {
          setAuthorizationError(true);
        } else {
          setAuthorizationError(false);
        }
        if ('username' in response) {
          setUsernameError(response['username'][0]);
        } else {
          setUsernameError('');
        }
        if ('password' in response) {
          setPasswordError(response['password'][0]);
        } else {
          setPasswordError('');
        }
      }
    });
  };

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  error={usernameError !== ''}
                  helperText={usernameError}
                  required
                  name='username'
                  id='username'
                  label='Username'
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={passwordError !== ''}
                  helperText={passwordError}
                  required
                  name='password'
                  id='password'
                  label='Password'
                  type='password'
                  fullWidth
                />
              </Grid>
              <Authorization value={ authorizationError } />
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Log in
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link
                  variant='body2'
                  onClick={RegisterRedirect}
                  id='register_redirect'
                >
                  Don't have an account? Register.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
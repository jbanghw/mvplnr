import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';



export default function Register() {
  // error messages for the fields
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [usernameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  let allGood = false;

  // login redirect
  const navigate = useNavigate();
  const loginRedirect = () => {
    navigate('/login')
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch ('http://localhost:8000/accounts/register/', {
      method: 'POST',
      body: data,
    })
    .then(response => {
      if (response.status === 201) {
        allGood = true;
        navigate('/login');
      }
      return response.json();
    })
    .then(response => {
      if (!allGood) {
        console.log(response);
        if ('first_name' in response) {
          setFirstNameError(response['first_name'][0]);
        } else {
          setFirstNameError('');
        }
        if ('last_name' in response) {
          setLastNameError(response['last_name'][0]);
        } else {
          setLastNameError('');
        }
        if ('username' in response) {
          setUserNameError(response['username'][0]);
        } else {
          setUserNameError('');
        }
        if ('password' in response) {
          setPasswordError(response['password'][0]);
        } else {
          setPasswordError('');
        }
        if ('email' in response) {
          setEmailError(response['email'][0]);
        } else {
          setEmailError('');
        }
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
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
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={firstNameError !== ''}
                helperText={firstNameError}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={lastNameError !== ''}
                helperText={lastNameError}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={emailError !== ''}
                helperText={emailError}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={usernameError !== ''}
                helperText={usernameError}
                required
                name='username'
                id='username'
                label='Username'
                type='username'
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordError !==''}
                helperText={passwordError}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12} sm={1.5}>
              Avatar
            </Grid>
            <Grid item xs={12} sm={3}>
              <input
                accept='image/*'
                type='file'
                id='avatar'
                name='avatar'
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                variant='body2'
                onClick={loginRedirect}
                id='login_redirect'
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
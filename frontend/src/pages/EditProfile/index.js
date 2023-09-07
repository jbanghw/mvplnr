import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Snackbar } from '@mui/material';
import { Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

export default function EditProfile() {
  const [originalAvatar, setOriginalAvatar] = useState('')
  const [avatarChanged, setAvatarChanged] = useState(false)
  // default values for the fields
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')
  const [imgData, setImgData] = useState('')
  const [cancelled, setCancelled] = useState(false)
    
  // snackbar
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const handleSnackBarOpen = () => {
    setSnackBarOpen(true)
  }
  const handleSnackBarClose = () => {
    setSnackBarOpen(false)
  }
  const snackBarAction = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleSnackBarClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  )

  // error messages for the fields
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [emailError, setEmailError] = useState('')
  let allgood = false
    
  const navigate = useNavigate()

  React.useEffect(() => {
    setAvatarChanged(false)
    setFirstNameError('')
    setLastNameError('')
    setUsernameError('')
    setEmailError('')

    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('access')}`,
    }
    fetch('http://localhost:8000/accounts/profile/', { headers })
    .then((response) => {
      if (response.status === 401) {
        navigate('/account/login')
      }
      return response.json()
    })
    .then(response => {
      setUsername(response['username'])
      setFirstName(response['first_name'])
      setLastName(response['last_name'])
      setEmail(response['email'])
      setAvatar(response['avatar'])
      setOriginalAvatar(response['avatar'])
    })
  }, [cancelled])

  // on change functions
  const handleUsernameChange = (newValue) => {
    setUsername(newValue.currentTarget.value)
  }
  const handleFirstNameChange = (newValue) => {
    setFirstName(newValue.currentTarget.value)
  }
  const handleLastNameChange = (newValue) => {
    setLastName(newValue.currentTarget.value)
  }
  const handleEmailChange = (newValue) => {
    setEmail(newValue.currentTarget.value)
  }
  const handleAvatarDelete = () => {
    setAvatarChanged(true)
    setAvatar('')
    setImgData('')
  }
  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setAvatarChanged(true)
      setAvatar(e.target.files[0])
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      e.target.value = '';
    }
  }

  // redirect to login page
  const formRefresh = () => {
    setCancelled(!cancelled)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (avatarChanged) {
      data.append('avatar', avatar);
    }
    fetch('http://localhost:8000/accounts/profile/edit/', {
      method: 'PATCH',
      headers: { 
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
      body: data,
    })
    .then((response) => {
      if (response.status === 200) {
        allgood = true
        setFirstNameError('')
        setLastNameError('')
        setUsernameError('')
        setEmailError('')
        handleSnackBarOpen()
      } else if (response.status === 401) {
        navigate('/account/login')
      }
      return response.json()
    })
    .then(response => {
      if (!allgood) {
        handleSnackBarClose()
        if ('first_name' in response) {
          setFirstNameError(response['first_name'][0])
        } else {
          setFirstNameError('')
        }
        if ('last_name' in response) {
          setLastNameError(response['last_name'][0])
        } else {
          setLastNameError('')
        }
        if ('username' in response) {
          setUsernameError(response['username'][0])
        } else {
          setUsernameError('')
        }
        if ('email' in response) {
          setEmailError(response['email'][0])
        } else {
          setEmailError('')
        }
      }
      allgood = false
    })
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component='form'
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          m='auto'
          alignItems='center'
        >
          <Grid container spacing={2} style={{ justifyContent: 'center' }}>
            <Grid item lg={'auto'}>
              <input
                hidden
                onChange={handleAvatarChange}
                accept="image/*"
                id="avatar"
                type="file"
              />
              <label htmlFor="avatar">
                <IconButton
                  color="primary"
                  component="span"
                >
                  <Tooltip title='Upload Avatar'>
                  <Avatar
                    src={avatarChanged ? imgData : originalAvatar}
                    sx={{ width: 200, height: 200}}
                  />
                  </Tooltip>
                </IconButton>
              </label>
            </Grid>

            <Grid item xs={12} sm={8}>
            </Grid>

            <Grid item xs={12} sm={4}>
              <IconButton
                color='warning'
                variant='contained'
                size='large'
                onClick={handleAvatarDelete}
              >
                <DeleteIcon></DeleteIcon>
              </IconButton>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                error={usernameError !== ''}
                helperText={usernameError}
                name='username'
                id='username'
                label='Username'
                type='username'
                value={username}
                onChange={handleUsernameChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                error={firstNameError !== ''}
                helperText={firstNameError}
                name='first_name'
                id='first_name'
                label='First name'
                value={firstName}
                onChange={handleFirstNameChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                error={lastNameError !== ''}
                helperText={lastNameError}
                name='last_name'
                id='last_name'
                label='Last name'
                value={lastName}
                onChange={handleLastNameChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                error={emailError !== ''}
                helperText={emailError}
                type='email'
                name='email'
                id='email'
                label='Email address'
                value={email}
                onChange={handleEmailChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={5.5}>
              <Button
                color='error'
                fullWidth
                variant='outlined'
                sx={{ mt: 3, mb: 2}}
                onClick={formRefresh}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} sm={1}></Grid>
            <Grid item xs={12} sm={5.5}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2}}
              >
                Save profile
              </Button>
              { snackBarOpen ?
                <Snackbar
                  open={snackBarOpen}
                  message='Profile Saved'
                  autoHideDuration={4000}
                  onClose={handleSnackBarClose}
                  action={snackBarAction}
                />
                : <div />
              }
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Container, Button, Box } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import RightMenu from './RightMenu';
import SearchAppBar from './Search';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar sx={{ background: '#252324', position: 'relative', zIndex: 1201 }}>
      {/* <AppBar sx={{ background: '#252324', position: 'static' }}> */}
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <MovieIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Box
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
            >
              <Button
                onClick={() => navigate('/')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Typography
                  textAlign={ 'center' }
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 900,
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  Home
                </Typography>
              </Button>
              <Button
                onClick={() => navigate('/profile')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Typography
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 900,
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  My List
                </Typography>
              </Button>
            </Box>

            <SearchAppBar />

            {
              localStorage.getItem('access')
              ? <RightMenu></RightMenu>
              : 
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  onClick={() => navigate('/login')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Typography
                    textAlign={ 'center' }
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 900,
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    Login
                  </Typography>

                </Button>
              </Box>
            }
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Navbar;

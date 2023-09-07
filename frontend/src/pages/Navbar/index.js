import React from 'react';
import { Link  } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Container, Button, Box  } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import RightMenu from './RightMenu';
import SearchAppBar from './Search';

const Navbar = () => {
  return (
    <>
      <AppBar
        sx={{
          background: '#252324',
          position: 'static',
          // zIndex: 1201
        }}>
          <Container maxWidth='xl'>
            <Toolbar>
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <MovieIcon sx={{ display: 'flex' }} />
                <Link to={'/'}>
                  <Button
                    sx={{
                      color: 'white',
                      display: 'block',
                    }}
                  >
                    <Typography
                      textAlign='center'
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
                </Link>
                <Link to={'/profile'}>
                  <Button
                    sx={{
                      color: 'white',
                      display: 'block',
                    }}
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
                </Link>
                <SearchAppBar />
              </Box>
              <Box
                sx={{
                  flexGrow: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {
                  localStorage.getItem('access')
                  ?
                  <RightMenu></RightMenu>
                  :
                  <Link to={'/login'}>
                    <Button
                      sx={{
                        color: 'white',
                        display: 'block'
                      }}
                    >
                      <Typography
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
                  </Link>
                }
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      <Outlet />
    </>
  );
};

export default Navbar;

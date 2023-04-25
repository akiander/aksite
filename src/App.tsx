
import './App.css'
import AppBar from '@mui/material/AppBar';
import { Auth } from 'aws-amplify';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react'
import { Routes, Route, Outlet } from "react-router-dom";
import { Secure } from './Secure';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

const pages = ['Home','About'];
const settings = ['Profile', 'Logout'];

export default function App() {
  return (
    <div>
        {/*      
          Routes nest inside one another. Nested route paths build upon
          parent route paths, and nested route elements render inside
          parent route elements. See the note about <Outlet> below. */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="secure" element={ <Secure />} />

            {/* Using path="*"" means "match anything", so this route
                  acts like a catch-all for URLs that we don't have explicit
                  routes for. */}
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
    </div>
  );
}

function Layout() {

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }

  const handleCloseNavMenu = (args:any) => {
    setAnchorElNav(null);
    const page: string = args.target.id;
    navigate(`/${page === 'Home'? '' : page}`); 
  }
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  // Detect of user is logged in or not
  const [username, setUsername] = useState('anon');

  const checkAuth = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log('user',user)
      setUsername(user?.username)
    }
    catch (error) {
      /* When the user is not authenticated, we'll land here */ 
    }
  }
  // checkAuth(); // find out why this is called so often

  const theme = useTheme()
  console.log('theme', theme)
  console.log('main', theme.palette.primary.main)

  return (
    <div className="layout-container">
    
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutorenewIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Aaron's Site
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography id={page} textAlign="center">{page}</Typography>
              </MenuItem>
              ))}
            </Menu>
          </Box>
          <AutorenewIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Aaron's Site
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                id={page} 
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    
    <main className="layout-main">
      <div className="layout-content">

          {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
        <Outlet />
      </div>
      
    </main>
    <footer className="layout-footer"
    style={{ "backgroundColor": `${theme.palette.grey[300]}`,   
    "color": `${theme.palette.secondary.contrastText}` }}> 
    <span className="layout-title">Footer</span>
  </footer>
  </div>
   
  );
}

function Home() {
  return (
    <div>
      <span>Home</span>
    </div>
  ); 
}

function About() {
  return (
    <div>
      <span>About</span>
    </div>
  );
} 

function NoMatch() {
  return (
    <div>
      <span>Page not found</span>
      <p>
        <Link href="/">Return to home</Link>
      </p>
    </div>
  );
}
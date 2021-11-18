import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './Navbar.css';

function Navbar() {
  return (
    <AppBar id='AppBar'>
      <Toolbar>
        {/* <img src={} alt='logo'/> */}
        <Typography variant="h2">
          Retro Arcade
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
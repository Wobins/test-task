import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }} className='text-white' style={{textDecoration: 'none'}}>
            Ange's Test Task
          </Typography>
          {/* <Button variant="contained" color="success" component={Link} to="/create-entry">
            Add Sector
          </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

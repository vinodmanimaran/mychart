import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import { Link as RouterLink } from 'react-router-dom';
import './Layout.css'
const drawerWidth = 250;

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className='appbar'>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            PEEJIYEM
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
        </div>
        <List>
          <ListItem button component={RouterLink} to="/">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={RouterLink} to="/agents">
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Agents" />
          </ListItem>
        </List>
      </Drawer>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;

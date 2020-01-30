import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import { NavLink } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";

const { useState } = React;

const styles = (theme) => ({
  appBar: {
    ...theme.appBar
  },
  appTitle: {
    paddingRight: 32,
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
      paddingRight: 12,
    }
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    opacity: 0.69,
    '&>button': {
      fontWeight: 600,
      margin: '0 4px',
      padding: '4px',
    },
  },
  sideNavLink: {
    textDecoration: 'none',
    '&>button > span': {
      color: 'white',
      [theme.breakpoints.down('sm')]: {
        fontSize: 10,
      }
    },
  },
  horizontalNavLinks: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  menuButton: {
    width: 64,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  activeLink: {
    opacity: 1,
  },
  appBarContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const NavBar = ({
  classes,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navLinks = [
    {
      to: '/arma-guild-picker/',
      label: 'Guild Picker'
    },
    {
      to: '/arma-guild-picker/guild-compare/',
      label: 'Guild Compare'
    },
    {
      to: '/arma-guild-picker/skill-picker/',
      label: 'Skill Picker'
    },
  ];

  const HorizonalNavLinks = navLinks.map(({to, label}) => (
    <NavLink to={to} className={classes.link} activeClassName={classes.activeLink} exact>
      <Button color="inherit">
        {label}
      </Button>
    </NavLink>
  ));

  const SideNavLinks = navLinks.map(({to, label}) => (
    <ListItem key={to}>
      <NavLink to={to} className={classes.sideNavLink} activeClassName={classes.activeLink} exact>
        <Button color="inherit">
          {label}
        </Button>
      </NavLink>
    </ListItem>
  ));

  return(
    <>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          {SideNavLinks}
        </List>
      </Drawer>
      <AppBar position="static">
        <div className={classes.appBarContainer}>
          <IconButton
            className={classes.menuButton}
            hidden-lg={true}
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <MenuIcon />
          </IconButton>
          <Toolbar className={classes.appBar}>
            <Typography className={classes.appTitle} variant="title" color="inherit">
              Armageddon MUD Skills & Guilds
            </Typography>
            <div className={classes.horizontalNavLinks}>
              {HorizonalNavLinks}
            </div>
          </Toolbar>
        </div>
      </AppBar>
    </>
  )
}
export default withRouter(withStyles(styles)(NavBar));

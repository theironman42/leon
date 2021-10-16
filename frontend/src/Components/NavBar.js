import React from 'react'
import { Button, Container, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';

const useStyles = makeStyles(theme => ({
  siteTitle: {
    textAlign: 'center',
  },
  menu: {
    backgroundColor: 'white'
  },
  menuItem: {
    margin: '10px'
  },
}));

function Navbar() {

  const classes = useStyles()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Container maxWidth="lg">
        <Toolbar>
          <Link to="/"><Typography className={classes.menuItem}>Home</Typography></Link>
          <Link to="/test"><Typography className={classes.menuItem}>Expertising</Typography></Link>
          <Link to="/test"><Typography className={classes.menuItem}>Contact</Typography></Link>
          <Link to="/admin/stamps"><Typography className={classes.menuItem}>Admin</Typography></Link>
          <Link to="/admin/users"><Typography className={classes.menuItem}>Users</Typography></Link>
          <Link to="/login"><Typography className={classes.menuItem}>Login</Typography></Link>
          <Link to="/register"><Typography className={classes.menuItem}>Register</Typography></Link>
          <Link to="/profile"><Typography className={classes.menuItem}>Profile</Typography></Link>
          <Button to="/logout" onClick={handleLogout}><Typography className={classes.menuItem}>Logout</Typography></Button>
        </Toolbar>
      </Container>
    </div>
  )
}

export default Navbar

import React from 'react'
import { Container, makeStyles, Toolbar, Typography } from '@material-ui/core'
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    siteTitle: {
      textAlign: 'center',
    },
    menu:{
      backgroundColor: 'white'
    },
    menuItem: {
      margin: '10px'
    },
  });

function Navbar() {

    const classes = useStyles()

    return (
        <div>
            <Container maxWidth="lg">
                <Toolbar>
                    <Link to="/test"><Typography className={classes.menuItem}>Home</Typography></Link>
                    <Link to="/test"><Typography className={classes.menuItem}>Expertising</Typography></Link>
                    <Link to="/test"><Typography className={classes.menuItem}>Shop</Typography></Link>
                    <Link to="/test"><Typography className={classes.menuItem}>Contact</Typography></Link>
                </Toolbar>
            </Container>
        </div>
    )
}

export default Navbar

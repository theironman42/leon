import { Paper, Typography } from '@material-ui/core'
import React from 'react'
import { makeStylesGlobal } from '../theme/GlobalTheme'



function Message({ message, color }) {
    
    const useStyles = makeStylesGlobal(theme => {
        return(
        {
            paperMessage: {
                backgroundColor: color || theme.palette.error.main,
                textAlign: 'center'
            },
            message:{
                
            }
        }
    )})

    const classes = useStyles()
    return (
        <Paper className={classes.paperMessage}>
            <Typography className={classes.message}>{message}</Typography>
        </Paper>
    )
}

export default Message

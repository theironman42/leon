import { createMuiTheme } from '@material-ui/core'
import { blue, green, lightBlue, red, yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

export const GlobalTheme = createMuiTheme({
    palette: {
        primary: {
            main: green[500],
        },
        secondary: {
            main: blue[500],
        },
        error: {
            main: red[500]
        },
        warning: {
            main: yellow[500]
        }
    }

})

export const GlobalStylesAppend = (newStyle, theme) => ({
    buttonsBox: {
        textAlign: 'right'
    },
    cancelButton: {
        margin: "12px",
        backgroundColor : red[100]
    },
    saveButton: {
        margin: "12px",
        backgroundColor : lightBlue[100]
    },
    dialog: {
        margin: "12px"
    },
    newButton: {
        textAlign: 'right',
        marginRight: '12px',

    },
    ...newStyle
})

export const makeStylesGlobal = newStyle => makeStyles(theme => GlobalStylesAppend(newStyle, theme));

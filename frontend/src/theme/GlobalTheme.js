import { createMuiTheme } from '@material-ui/core'
import { blue, green, lightBlue, red, yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';
import {greatVibesRegular} from './gvr'

export const GlobalTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: blue[500],
        },
        error: {
            main: red[100]
        },
        warning: {
            main: yellow[500]
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    overrides: {
        MuiCssBaseline: {
          '@global': {
            '@font-face': [greatVibesRegular],
          },
        },
      },

})

export const GlobalStylesAppend = (newStyle, theme) => ({
    buttonsBox: {
        textAlign: 'right'
    },
    cancelButton: {
        margin: "12px",
        backgroundColor: red[100]
    },
    saveButton: {
        margin: "12px",
        backgroundColor: lightBlue[100]
    },
    dialog: {
        margin: "12px"
    },
    newButton: {
        textAlign: 'right',
        marginRight: '12px',

    },
    title:{
        fontFamily: "GreatVibes-Regular",
        margin: '10px'
    },
    ...newStyle
})

export const makeStylesGlobal = newStyle => makeStyles(theme => GlobalStylesAppend(newStyle(theme), theme));

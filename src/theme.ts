import { createTheme } from '@mui/material/styles';
import { red, purple, teal } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: purple[500], 
    },
    secondary: {
      main: teal[200],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

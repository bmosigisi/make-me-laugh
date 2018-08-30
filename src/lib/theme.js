import red from '@material-ui/core/colors/red';
import deepOrange from '@material-ui/core/colors/deepOrange';
import pink from '@material-ui/core/colors/pink';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: pink,
    error: red,
  },
  overrides: {
    MuiIconButton: {
      root: {
        '&:hover': {
          backgroundColor: 'inherit',
        },
      },
    },
    MuiButton: {
      root: {
        minWidth: 88,
      },
    },
  },
});

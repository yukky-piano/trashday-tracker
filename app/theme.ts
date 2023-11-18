import { purple } from '@mui/material/colors';
import {experimental_extendTheme} from '@mui/material/styles';

const theme = experimental_extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: purple[200],
        }
      }
    }
  }
});

export default theme;

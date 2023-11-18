import { purple } from '@mui/material/colors';
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: purple[200],
    }
  }
});

export default theme;

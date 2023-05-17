import { createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#373882', // Your desired primary color
    },
    secondary: {
      main: blue[500],
    }
  },
});

export default theme;
import { blueGrey, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey.A400,
    },
    secondary: {
      main: blueGrey.A700,
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;

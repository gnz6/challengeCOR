import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const mainTheme = createTheme({
  palette:{
    mode:"light",
    background:{
      default: "#e0e0e0"
    },
    primary:{
      main:"#4a148c"
    },
    secondary:{
      main:"#19857b"
    },
    error:{
      main: red.A400
    }
  },
  components:{
    MuiAppBar:{
      defaultProps: {
        elevation : 0

      },
      styleOverrides:{
        root:{
          backgroundColor: "#4a148c"
        }
      }
    },
    MuiIconButton:{
      styleOverrides:{
        root:{
          color:"#ffffff"
        }
      }
    }
  }
});
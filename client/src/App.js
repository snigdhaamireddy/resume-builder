import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./Constants";
import RoutesComponent from "./components/RoutesComponent";
import SnackBar from "./components/SnackBar";

function App() {
  return (
      <ThemeProvider theme={lightTheme}>
        <SnackBar />
        <RoutesComponent />
      </ThemeProvider>
  );
}

export default App;

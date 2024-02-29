import { ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./Constants";
import RoutesComponent from "./components/RoutesComponent";

function App() {
  return (
      <ThemeProvider theme={lightTheme}>
        <RoutesComponent />
      </ThemeProvider>
  );
}

export default App;

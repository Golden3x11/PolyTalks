import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createTheme, ThemeProvider } from '@mui/material';
import { red } from '@mui/material/colors';
import { Header } from './components/Header';
import {FileUploadComponent} from "./components/FileUploadComponent";

const theme = createTheme({
  palette: {
    primary: {
      main: '#e15050',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

function App() {
  return (
    <GoogleOAuthProvider clientId={'407712005402-sumiqjgamkhccs0flh9o6p26gijrmepn.apps.googleusercontent.com'}>
      <ThemeProvider theme={theme}>
        <Header/>
        <FileUploadComponent/>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

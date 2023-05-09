import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { SideNavBar } from './components/SideNavBar';
import { Header } from './components/Header';

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
          <CssBaseline/>

          <Header/>
          <SideNavBar/>
          {/*<FileUploadComponent/>*/}
        </ThemeProvider>
      </GoogleOAuthProvider>
  );
}

export default App;
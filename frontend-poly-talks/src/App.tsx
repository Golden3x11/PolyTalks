import React from 'react';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { SideNavBar } from './components/navbars/SideNavBar';
import { Header } from './components/navbars/Header';

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
        </ThemeProvider>
      </GoogleOAuthProvider>
  );
}

export default App;

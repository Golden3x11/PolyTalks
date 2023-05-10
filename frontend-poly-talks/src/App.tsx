import React from 'react';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Sidebar } from './components/navbars/Sidebar';
import { Header } from './components/navbars/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CoursesPage } from './pages/CoursesPage';
import { LecturersPage } from './pages/LecturersPage';
import { HomePage } from './pages/HomePage';

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
        <CssBaseline />
          <Header/>

          <Sidebar/>

          <div style={{marginLeft: "15%", position: "relative", height: "93%"}}>
            <BrowserRouter>
              <Routes>
                <Route path={'/course'} Component={CoursesPage}></Route>
                <Route path={'/lecturer'} Component={LecturersPage}></Route>
                <Route path={'/'} Component={HomePage}></Route>
              </Routes>
            </BrowserRouter>
          </div>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

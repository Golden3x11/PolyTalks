import React, { useState } from 'react';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Sidebar } from './components/navbars/Sidebar';
import { Header } from './components/navbars/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CoursesPage } from './pages/CoursesPage';
import { LecturersPage } from './pages/LecturersPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { TrendingPage } from './pages/TrendingPage';
import { ThreadsPage } from './pages/ThreadsPage';
import { CreateCoursePage } from './pages/CreateCoursePage';
import { CreateLecturerPage } from './pages/CreateLecturerPage';
import { CreateThreadPage } from './pages/CreateThreadPage';
import { UserPage } from './pages/UserPage';
import { AuthContext, DecodedToken } from './authentication/Authentication';

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
  const [currentUser, setCurrentUser] = useState<DecodedToken | undefined>(undefined);

  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      <GoogleOAuthProvider clientId={'407712005402-sumiqjgamkhccs0flh9o6p26gijrmepn.apps.googleusercontent.com'}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>

            <CssBaseline />
            <Header />

            <Sidebar />

            <div style={{ marginLeft: '15%', position: 'relative', height: '93%' }}>
              <Routes>
                <Route path={'/'} Component={TrendingPage}></Route>
                <Route path={'/favourites'} Component={FavouritesPage}></Route>
                <Route path={'/courses'} Component={CoursesPage}></Route>
                <Route path={'/lecturers'} Component={LecturersPage}></Route>
                <Route path={'/threads'} Component={ThreadsPage}></Route>
                <Route path={'/courses/create'} Component={CreateCoursePage}></Route>
                <Route path={'/lecturers/create'} Component={CreateLecturerPage}></Route>
                <Route path={'/threads/create'} Component={CreateThreadPage}></Route>
                <Route path={'/user'} Component={UserPage}></Route>
              </Routes>
            </div>
          </BrowserRouter>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </AuthContext.Provider>
  );
}

export default App;

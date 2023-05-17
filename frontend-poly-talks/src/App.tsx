import React, { useState } from 'react';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Sidebar } from './components/navbars/Sidebar';
import { Header } from './components/navbars/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CoursesPage } from './pages/CoursesPage';
import { LecturersPage } from './pages/Lecturer/LecturersPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { TrendingPage } from './pages/TrendingPage';
import { ThreadsPage } from './pages/ThreadsPage';
import { CreateCoursePage } from './pages/CreateCoursePage';
import { CreateLecturerPage } from './pages/Lecturer/CreateLecturerPage';
import { CreateThreadPage } from './pages/CreateThreadPage';
import { UserPage } from './pages/UserPage';
import { AuthContext } from './authentication/Authentication';
import { SingleThread } from './pages/SingleThread';
import { SingleLecturerPage } from './pages/Lecturer/SingleLecturerPage';
import { SnackbarProvider } from 'notistack';
import { UserDto } from './dto/user.dto';

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
  const [currentUser, setCurrentUser] = useState<UserDto | undefined>(undefined);

  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      <GoogleOAuthProvider clientId={'407712005402-sumiqjgamkhccs0flh9o6p26gijrmepn.apps.googleusercontent.com'}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider />
          <BrowserRouter>

            <CssBaseline />
            <Header />

            <Sidebar />

            <div style={{ marginLeft: '15%', position: 'relative', minHeight: '93%', background: "rgb(242 242 242)" }}>
              <Routes>
                <Route path={'/'} Component={TrendingPage}></Route>
                <Route path={'/favourites'} Component={FavouritesPage}></Route>
                <Route path={'/threads'} Component={ThreadsPage}></Route>
                <Route path={'/threads/create'} Component={CreateThreadPage}></Route>
                <Route path={'/threads/:id'} Component={SingleThread}></Route>
                <Route path={'/courses'} Component={CoursesPage}></Route>
                <Route path={'/courses/create'} Component={CreateCoursePage}></Route>
                <Route path={'/lecturers'} Component={LecturersPage}></Route>
                <Route path={'/lecturers/create'} Component={CreateLecturerPage}></Route>
                <Route path="/lecturer/:id" Component={SingleLecturerPage}></Route>
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

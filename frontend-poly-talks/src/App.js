import './App.css';
import { googleLogout, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Button } from '@mui/material';
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(undefined)

  return (
    <GoogleOAuthProvider clientId={"407712005402-sumiqjgamkhccs0flh9o6p26gijrmepn.apps.googleusercontent.com"}>
      {!loggedIn && <GoogleLogin
        onSuccess={credentialResponse => {
          setLoggedIn(credentialResponse)
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />}
      <Button onClick={() => {
        googleLogout()
        setLoggedIn(undefined)
      }}>
        Logout
      </Button>
    </GoogleOAuthProvider>
  );
}

export default App;

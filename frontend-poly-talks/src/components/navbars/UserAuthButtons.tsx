import { CredentialResponse, GoogleLogin, googleLogout } from '@react-oauth/google';
import { Avatar, Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { NavLink } from 'react-router-dom';
import './../../styles/navbars.css';
import { AuthContext, decodeToken } from '../../authentication/Authentication';
import { createUser } from '../../services/UserApiService';

const useStyles = makeStyles()({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: "0",
    marginRight: "12px" // HACK: minimum value to not make appbar wider than screen (probably caused by styles inside GoogleLogin component)
  },
  margin: {
    marginRight: '10px',
  },
});

export const UserAuthButtons = () => {
  const [token, setToken] = useState<CredentialResponse | undefined>(undefined); // TODO: refactor to get rid of it
  const { classes, cx } = useStyles(undefined, undefined);
  const {currentUser, setCurrentUser} = useContext(AuthContext)

  useEffect(() => {
    if(token?.credential){
      createUser({
        token: token.credential
      })
      localStorage.setItem("token", token.credential);
      setCurrentUser(decodeToken(token.credential));
    }else{
      localStorage.removeItem("token");
      setCurrentUser(undefined);
    }
  }, [token, setCurrentUser])

  return (
    <div className={cx(classes.container)}>
      {!currentUser && <GoogleLogin
        type={'icon'}
        onSuccess={credentialResponse => {
          setToken(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />}

      {currentUser && <>
        <Button
          className={cx(classes.margin)}
          variant={'contained'}
          onClick={() => {
            googleLogout();
            setToken(undefined);
          }}>
          Logout
        </Button>
        <NavLink to={"/user"}>
          <Avatar
            className={cx(classes.margin)}
            src={`/avatar-1.jpg`}
          />
        </NavLink>
      </>
      }
    </div>
  );
};
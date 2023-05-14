import { CredentialResponse, GoogleLogin, googleLogout } from '@react-oauth/google';
import { Avatar, Button } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { NavLink } from 'react-router-dom';
import './../../styles/navbars.css';

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
  const [loggedIn, setLoggedIn] = useState<CredentialResponse | undefined>(undefined); // TODO: store in context or sth
  const { classes, cx } = useStyles(undefined, undefined);

  return (
    <div className={cx(classes.container)}>
      {!loggedIn && <GoogleLogin
        type={'icon'}
        onSuccess={credentialResponse => {
          setLoggedIn(credentialResponse);
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />}

      {loggedIn && <>
        <Button
          className={cx(classes.margin)}
          variant={'contained'}
          onClick={() => {
            googleLogout();
            setLoggedIn(undefined);
          }}>
          Logout
        </Button>
        <NavLink to={"/user"}>
          <Avatar className={cx(classes.margin)} />
        </NavLink>
      </>
      }
    </div>
  );
};
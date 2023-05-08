import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { Avatar, Button } from '@mui/material';
import { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  margin: {
    marginRight: "10px"
  }
});

export const UserButtons = () => {
  const [loggedIn, setLoggedIn] = useState(undefined); // TODO: store in context or sth
  const { classes, cx } = useStyles(undefined, undefined)

  return (
    <>
      {!loggedIn && <GoogleLogin
        type={"icon"}
        onSuccess={credentialResponse => {
          setLoggedIn(credentialResponse);
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />}

      {loggedIn &&
        <div className={cx(classes.container)}>
          <Button
            className={cx(classes.margin)}
            variant={"contained"}
            onClick={() => {
              googleLogout();
              setLoggedIn(undefined);
            }}>
            Logout
          </Button>
          <Avatar/>
        </div>
      }
    </>
  );
};
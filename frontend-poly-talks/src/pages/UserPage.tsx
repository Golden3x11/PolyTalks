import { Avatar, Button, IconButton, Stack, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, getToken } from '../authentication/Authentication';
import { UserDto } from '../dto/user.dto';
import { updateUser } from '../services/UserApiService';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  header: {
    color: theme.palette.primary.main,
  },
  usernameInput: {
    width: '20%',
  },
  stack: {
    margin: '0 2em',
  },
  avatar: {
    width: '5em',
    height: '5em',
  },
  avatarActive: {
    border: `4px solid ${theme.palette.primary.main}`,
  },
  updateButton: {
    width: "7%",
  }
}));

export const UserPage = () => {
  const { classes } = useStyles(undefined, undefined);
  const [user, setUser] = useState<UserDto | undefined>();
  const navigate = useNavigate();
  const {currentUser, setCurrentUser} = useContext(AuthContext)

  useEffect(() => {
    if (!getToken()) {
      enqueueSnackbar('Zaloguj się kontem Google');
      navigate('/');
    }
    setUser(currentUser)
  }, [currentUser, navigate]);

  const handleUserUpdate = (newUser: UserDto) => {
    updateUser({
      username: newUser.username,
      avatar: newUser.avatar,
      token: getToken()!!,
    })
      .then((updatedUser) => {
        setUser(updatedUser);
        setCurrentUser(updatedUser);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Nie udało się zaktualizować danych użytkownika');
      });
  };

  return <Stack className={classes.stack}>
    <h1 className={classes.header}>
      Zmień nickname
    </h1>

    <Stack direction={"row"} spacing={3}>
      <TextField
        value={user?.username ?? ''}
        className={classes.usernameInput}
        size={"small"}
        onChange={(e) => setUser(user ? { ...user, username: e.target.value } : undefined)}
      />

      <Button
        variant={"contained"}
        onClick={() => user && handleUserUpdate(user)}
        className={classes.updateButton}
      >
        Zapisz
      </Button>
    </Stack>

    <h1 className={classes.header}>
      Wybierz avatar
    </h1>

    <Stack direction={'row'} spacing={2}>
      {
        Array.from({ length: 5 }, (_, i) => i + 1)
          .map(number =>
            <IconButton>
              <Avatar
                src={`/avatar-${number}.jpg`}
                className={`${classes.avatar} ${number.toString() === user?.avatar ? classes.avatarActive : ''}`}
                onClick={() => {
                  const newUser = user ? { ...user, avatar: number.toString() } : undefined

                  if(newUser){
                    setUser(newUser);
                    handleUserUpdate(newUser);
                  }
                }}
              />
            </IconButton>,
          )
      }
    </Stack>
  </Stack>;
};
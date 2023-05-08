import { AppBar, Toolbar } from '@mui/material';
import { UserButtons } from './UserButtons';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    height: "70%"
  },
  appBar: {
    height: "50px",
    borderBottom: "2px solid grey"
  }
});

export const Header = () => {
  const { classes, cx } = useStyles(undefined, undefined)

  return <AppBar className={cx(classes.appBar)} color={'secondary'}>
      <Toolbar className={cx(classes.toolbar)} variant="dense">
        <img src="/logo.svg" alt={"logo"} className={cx(classes.logo)}/>
        <UserButtons/>
      </Toolbar>
  </AppBar>;
};
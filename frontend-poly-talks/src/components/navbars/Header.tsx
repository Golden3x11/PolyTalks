import { AppBar } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { UserButtons } from './UserButtons';

const useStyles = makeStyles()({
  logo: {
    height: "70%",
    marginLeft: "10px"
  },
  appBar: {
    position: "sticky",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50px",
    borderBottom: "3px solid grey",
    width: "100%"
  }
});

export const Header = () => {
  const { classes, cx } = useStyles(undefined, undefined)

  return (
    <AppBar
      className={cx(classes.appBar)}
      color={'secondary'}
    >
      <img src="/logo.svg" alt={"logo"} className={cx(classes.logo)}/>
      <UserButtons/>
    </AppBar>
  );
};
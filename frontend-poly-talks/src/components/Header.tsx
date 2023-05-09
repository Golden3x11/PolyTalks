import { AppBar } from '@mui/material';
import { UserButtons } from './UserButtons';
import { makeStyles } from 'tss-react/mui';

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
    borderBottom: "2px solid grey",
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
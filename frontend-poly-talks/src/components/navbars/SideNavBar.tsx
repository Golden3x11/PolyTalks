import { Stack, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { ItemWithIcon } from './ItemWithIcon';
import CallMadeIcon from '@mui/icons-material/CallMade';

const useStyles = makeStyles()((theme) => ({
  container: {
    borderRight: '3px solid grey',
    position: "fixed",
    height: "100%",
    width: "15%",
    padding: "1%"
  },
  firstChild: {
    marginTop: "5%"
  },
  header: {
    color: theme.palette.primary.main
  }
}));

export const SideNavBar = () => {
  const { classes, cx } = useStyles(undefined, undefined);

  return (
    <Stack
      className={cx(classes.container)}
      spacing={3}
    >
      <Stack spacing={2}>
        <Typography className={`${classes.firstChild} ${classes.header}`}>Tematy</Typography>
        <ItemWithIcon text={"Na czasie"} icon={CallMadeIcon}/>
        <ItemWithIcon text={"Ulubione"} icon={CallMadeIcon}/>
      </Stack>

      <Stack spacing={2}>
        <Typography className={classes.header}>Kategorie</Typography>
        <ItemWithIcon text={"Kursy"} icon={CallMadeIcon}/>
        <ItemWithIcon text={"Prowadzący"} icon={CallMadeIcon}/>
        <ItemWithIcon text={"Inne"} icon={CallMadeIcon}/>
      </Stack>

      <Stack spacing={2}>
        <Typography className={classes.header}>Utwórz</Typography>
        <ItemWithIcon text={"Kurs"} icon={CallMadeIcon}/>
        <ItemWithIcon text={"Prowadzącego"} icon={CallMadeIcon}/>
        <ItemWithIcon text={"Wątek"} icon={CallMadeIcon}/>
      </Stack>

    </Stack>
  );
};
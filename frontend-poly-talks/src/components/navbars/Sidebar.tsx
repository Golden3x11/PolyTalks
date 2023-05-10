import { Stack, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { IconText } from './IconText';
import CallMadeIcon from '@mui/icons-material/CallMade';
import StarIcon from '@mui/icons-material/Star';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import TagIcon from '@mui/icons-material/Tag';

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

export const Sidebar = () => {
  const { classes, cx } = useStyles(undefined, undefined);

  return (
    <Stack
      className={cx(classes.container)}
      spacing={3}
    >
      <Stack spacing={2}>
        <Typography className={`${classes.firstChild} ${classes.header}`}>Tematy</Typography>
        <IconText text={"Na czasie"} Icon={CallMadeIcon}/>
        <IconText text={"Ulubione"} Icon={StarIcon}/>
      </Stack>

      <Stack spacing={2}>
        <Typography className={classes.header}>Kategorie</Typography>
        <IconText text={"Kursy"} Icon={MenuBookIcon}/>
        <IconText text={"Prowadzący"} Icon={PersonIcon}/>
        <IconText text={"Inne"} Icon={TagIcon}/>
      </Stack>

      <Stack spacing={2}>
        <Typography className={classes.header}>Utwórz</Typography>
        <IconText text={"Kurs"} Icon={MenuBookIcon}/>
        <IconText text={"Prowadzącego"} Icon={PersonIcon}/>
        <IconText text={"Wątek"} Icon={TagIcon}/>
      </Stack>

    </Stack>
  );
};
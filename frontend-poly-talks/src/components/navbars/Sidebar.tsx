import { Stack, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { IconText } from './IconText';
import CallMadeIcon from '@mui/icons-material/CallMade';
import StarIcon from '@mui/icons-material/Star';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import TagIcon from '@mui/icons-material/Tag';
import './../../styles/navbars.css';

const useStyles = makeStyles()((theme) => ({
  container: {
    borderRight: '3px solid grey',
    position: "fixed",
    alignSelf: "self-start",
    width: "15%",
    padding: "1%",
    top: "0",
    height: "100%"
  },
  firstChild: {
    marginTop: "38%"
  },
  header: {
    color: theme.palette.primary.main,
    fontWeight: "bold"
  }
}));

export const Sidebar = () => {
  const { classes, cx } = useStyles(undefined, undefined);
  const innerStacksSpacing = 2;
  const outerStackSpacing = 4;

  return (
    <Stack
      className={cx(classes.container)}
      spacing={outerStackSpacing}
      style={{background: "rgb(242 242 242)"}}
    >
      <Stack spacing={innerStacksSpacing}>
        <Typography className={`${classes.firstChild} ${classes.header}`}>Tematy</Typography>
        <IconText text={"Na czasie"} Icon={CallMadeIcon} route={"/"}/>
        <IconText text={"Ulubione"} Icon={StarIcon} route={"/favourites"}/>
      </Stack>

      <Stack spacing={innerStacksSpacing}>
        <Typography className={classes.header}>Kategorie</Typography>
        <IconText text={"Kursy"} Icon={MenuBookIcon} route={"/courses"}/>
        <IconText text={"Prowadzący"} Icon={PersonIcon} route={"/lecturers"}/>
        <IconText text={"Inne"} Icon={TagIcon} route={"/threads"}/>
      </Stack>

      <Stack spacing={innerStacksSpacing}>
        <Typography className={classes.header}>Utwórz</Typography>
        <IconText text={"Kurs"} Icon={MenuBookIcon} route={"/courses/create"}/>
        <IconText text={"Prowadzącego"} Icon={PersonIcon} route={"/lecturers/create"}/>
        <IconText text={"Wątek"} Icon={TagIcon} route={"/threads/create"}/>
      </Stack>

    </Stack>
  );
};
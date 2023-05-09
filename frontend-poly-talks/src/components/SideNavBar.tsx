import { Stack, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()({
  container: {
    border: '2px solid grey',
    position: "fixed",
    height: "100%",
    width: "20%"
  },
});

export const SideNavBar = () => {
  const { classes, cx } = useStyles(undefined, undefined);

  return (
    <Stack
      className={cx(classes.container)}
      spacing={2}
    >
      <Typography>Tematy</Typography>
      <Typography>Kategorie</Typography>
      <Typography>Utwórz</Typography>
    </Stack>
  );
};
import { SvgIcon, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import CallMadeIcon from '@mui/icons-material/CallMade';

interface ItemWithIconProps {
  text: string;
  icon: typeof SvgIcon;
}

const useStyles = makeStyles()({
  container: {
    width: "60%",
  },
  marginLeft: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: "12%",
    width: "100%"
  }
});

export const ItemWithIcon = (props: ItemWithIconProps) => {
  const { text, icon } = props;
  const { classes, cx } = useStyles(undefined, undefined)

  return <div className={cx(classes.container)}>
    <div className={cx(classes.marginLeft)}>
      <CallMadeIcon/>
      <Typography>{text}</Typography>
    </div>
  </div>;
};
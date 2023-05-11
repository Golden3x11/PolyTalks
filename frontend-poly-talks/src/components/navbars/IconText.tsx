import { Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles()({
  wrapper: {
    width: '60%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '12%',
    width: '100%',
    textDecoration: 'none',
    color: 'black'
  },
  text: {
    marginLeft: '5%',
  },
});

interface IconTextProps {
  text: string;
  route: string;
  Icon: React.ElementType;
}

export const IconText = (props: IconTextProps) => {
  const { text, route, Icon } = props;
  const { classes, cx } = useStyles(undefined, undefined);

  // Navlink wrapped in div to use marginLeft (which is ignored for Stack children)
  return <div className={cx(classes.wrapper)}>
    <NavLink className={cx(classes.container)} to={route}>
      <Icon />
      <Typography className={cx(classes.text)}>{text}</Typography>
    </NavLink>
  </div>;
};
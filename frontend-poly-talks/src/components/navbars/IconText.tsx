import { Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import React from 'react';

const useStyles = makeStyles()({
  wrapper: {
    width: "60%",
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: "12%",
    width: "100%"
  },
  text: {
    marginLeft: "5%"
  }
});

interface ItemWithIconProps {
  text: string;
  Icon: React.ElementType;
}

export const IconText = (props: ItemWithIconProps) => {
  const { text, Icon } = props;
  const { classes, cx } = useStyles(undefined, undefined)

  // div wrapped in div to use marginLeft (which is ignored for Stack children)
  return <div className={cx(classes.wrapper)}>
    <div className={cx(classes.container)}>
      <Icon/>
      <Typography className={cx(classes.text)}>{text}</Typography>
    </div>
  </div>;
};
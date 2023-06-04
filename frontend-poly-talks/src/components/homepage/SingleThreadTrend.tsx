import { Avatar, Card, CardContent, Stack, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Link } from 'react-router-dom';

interface SingleThreadTrendProps {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string
}

const useStyles = makeStyles()(() => ({
  card: {
    width: '300px',
    height: '100%',
  },
  description: {
    textAlign: "justify",
    textJustify: "inter-word",
  },
}));

export const SingleThreadTrend = (props: SingleThreadTrendProps) => {
  const {id, title, content, author, authorAvatar} = props;
  const {classes} = useStyles();

  const shortenContent = (text: string) => {
    return text.length > 90 ? `${text.substring(0, 91)}...` : text;
  }

  return <Card className={classes.card}>
    <CardContent sx={{height: "100%"}}>
      <Stack spacing={1} sx={{height: "100%"}}>
        <Stack spacing={2} sx={{height: "80%"}}>
          <Link to={`/threads/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Typography variant={"h4"} component={"p"}>{title}</Typography>
          </Link>
          <div className={classes.description}>
            {shortenContent(content)}
          </div>
        </Stack>
        <Stack direction={"row"} spacing={1} alignItems={"center"} sx={{height: "20%"}}>
          <Avatar src={`/avatar-${authorAvatar}.jpg`}/>
          <Typography>{author}</Typography>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
};
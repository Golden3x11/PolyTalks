import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { ThreadDto } from '../../dto/thread.dto';
import { SingleThreadTrend } from './SingleThreadTrend';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  red: {
    color: theme.palette.primary.main
  },
  container: {
    height: "35%"
  },
  trendsContainer: {
    height: "67%",
  }
}));

export const TodayTrends = () => {
  const [trends, setTrends] = useState<ThreadDto[] | undefined>(undefined)
  const {classes} = useStyles();

  useEffect(() => {
    setTrends([{
      _id: "6464d7b7d020504aca68f098",
      title: "Piwo piwerko",
      description: "Jakie piwko jest najlepsze do leja?",
      tags: ["piwo"],
      creationDate: new Date(),
      posts: [],
      subscribers: [],
      author: {
        _id: "aaaaaa",
        username: "Orzelek123",
        email: "orzelek@email",
        avatar: "2"
      }
    }, {
      _id: "6464d7b7d020504aca68f098",
      title: "Rajdzik",
      description: "Siema, szukamy rajdu. Macie jakieś miejsca do polecenia? Najlepiej z stabilnymi lozkami. No i zeby bylo duzo alko hehe",
      tags: ["piwo"],
      creationDate: new Date(),
      posts: [],
      subscribers: [],
      author: {
        _id: "aaaaaa",
        username: "Oczy kobry",
        email: "orzelek@email",
        avatar: "1"
      }
    }])
    setTrends(prevState => [prevState![0], prevState![1], prevState![0], prevState![1]])
  }, [])

  return <div className={classes.container}>
    <h1 className={classes.red} style={{fontWeight: 'bold'}}>Dzisiejsze trendy</h1>
    <Stack
      direction={"row"}
      spacing={2}
      className={classes.trendsContainer}
    >
      {trends?.map(trend =>
        <SingleThreadTrend
          id={trend._id}
          title={trend.title}
          content={trend.description}
          author={trend.author.username}
          authorAvatar={trend.author.avatar}
        />
      )}
    </Stack>
  </div>
};
import { makeStyles } from 'tss-react/mui';
import { Card, CardContent, Rating, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface SinglePopularLecturerProps {
  id: string;
  name: string;
  surname: string;
  averageRating: number;
  numberOfLastWeekOpinions: number;
}

const useStyles = makeStyles()(() => ({
  card: {
    width: '40%',
    minWidth: "580px",
    height: '30%',
  }
}));

export const SinglePopularLecturer = (props: SinglePopularLecturerProps) => {
  const {id, name, surname, averageRating, numberOfLastWeekOpinions: numberOfOpinions} = props
  const {classes} = useStyles();

  const shortenName = () => {
    const limit = 20;

    return name.length + surname.length >= limit
      ? `${name.substring(0, 1)}. ${surname}`
      : `${name} ${surname}`;
  }

  return <Card className={classes.card}>
    <CardContent sx={{height: "100%"}}>
      <Stack spacing={1} direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{height: "100%"}}>
        <Stack spacing={2} justifyContent={"center"} sx={{height: "100%"}}>
          <Link to={`/lecturer/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Typography variant={"h4"} component={"p"} noWrap={true}>{shortenName()}</Typography>
            <Typography variant={"h6"} component={"p"}>{`${numberOfOpinions} opinii w ostatnim tygodniu`}</Typography>
          </Link>
        </Stack>
        <Rating
          value={averageRating}
          disabled={true}
          size={"large"}
        />
      </Stack>
    </CardContent>
  </Card>
};
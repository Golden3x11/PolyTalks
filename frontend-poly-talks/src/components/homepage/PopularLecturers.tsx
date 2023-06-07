import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { LecturerDto } from '../../dto/lecturer.dto';
import { SinglePopularLecturer } from './SinglePopularLecturer';

const useStyles = makeStyles()((theme) => ({
  red: {
    color: theme.palette.primary.main
  },
  container: {
    height: "70%"
  },
  lecturersContainer: {
    height: "80%",
  }
}));

export const PopularLecturers = () => {
  const [lecturers, setLecturers] = useState<LecturerDto[] | undefined>(undefined)
  const {classes} = useStyles();

  useEffect(() => {
    fetch('http://localhost:8080/api/lecturer/popular')
      .then(response => response.json())
      .then(data => setLecturers(data))
  }, [])

  return <div className={classes.container}>
    <h1 className={classes.red} style={{fontWeight: 'bold'}}>Znasz ich? Wystaw opinię 😀</h1>
    <Stack
      direction={"column"}
      spacing={2}
      className={classes.lecturersContainer}
    >
      {lecturers?.map(lecturer =>
        <SinglePopularLecturer
          id={lecturer._id}
          name={lecturer.name}
          surname={lecturer.surname}
          averageRating={(lecturer.ratings
            .map(rating => rating.rating_difficulty + rating.rating_friendliness + rating.rating_knowledge + rating.rating_communication)
            .reduce((a, b) => a+b, 0))/(lecturer.ratings.length*4)}
          numberOfLastWeekOpinions={lecturer.ratings.length} // TODO: update to number of last week opinions
        />
      )}
    </Stack>
  </div>
};
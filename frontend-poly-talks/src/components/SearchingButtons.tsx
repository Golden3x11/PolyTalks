import { SearchParams } from '../pages/SearchingPage';
import { Button, Stack } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useEffect, useState } from 'react';

interface SearchingButtonsProps{
  params: SearchParams
  onChange: (params: SearchParams) => void;
}

const useStyles = makeStyles()((theme) => ({
  active: {
    background: theme.palette.primary.main
  },
  inactive: {
    background: "rgb(198 196 196)"
  },
  container: {
    width: "40%",
    alignItems: "center",
    padding: "1%",
    // backgroundColor: "rgb(236,212,212)",
    // border: "solid rgb(198 196 196)"
  },
  filtersHeader: {
    fontWeight: "bold",
    fontSize: "1.2em"
  },
  filterButton: {
    width: "85%"
  }
}));

export const SearchingButtons = (props: SearchingButtonsProps) => {
  const {params, onChange} = props;
  const {classes} = useStyles();

  const [lecturers, setLecturers] = useState<boolean>(params.lecturers === "true");
  const [courses, setCourses] = useState<boolean>(params.courses === "true");
  const [threads, setThreads] = useState<boolean>(params.threads === "true");
  const [tags, setTags] = useState<boolean>(params.searchByTags === "true");

  const booleanToString = (param: boolean) => param ? "true" : "false"

  // run onChange method if params changed
  useEffect(() => {
    onChange({
      lecturers: booleanToString(lecturers),
      courses: booleanToString(courses),
      threads: booleanToString(threads),
      searchByTags: booleanToString(tags)
    })
  }, [lecturers, courses, threads, tags, onChange])

  return (
    <Stack direction={"row"} spacing={2} className={classes.container}>
      <Button variant={'contained'} className={`${lecturers ? classes.active : classes.inactive} ${classes.filterButton}`}
              onClick={() => setLecturers(prevState => {
                return !prevState;
              })}>
        Prowadzący
      </Button>

      <Button variant={'contained'} className={`${courses ? classes.active : classes.inactive} ${classes.filterButton}`}
              onClick={() => setCourses(prevState => {
                return !prevState;
              })}>
        Kursy
      </Button>

      <Button variant={'contained'} className={`${threads ? classes.active : classes.inactive} ${classes.filterButton}`}
              onClick={() => setThreads(prevState => {
                return !prevState;
              })}>
        Wątki
      </Button>

      <Button
        variant={'contained'}
        className={`${tags ? classes.active : classes.inactive} ${classes.filterButton}`}
        onClick={() => setTags(prevState => {
          return !prevState;
        })}
      >
        Tagi
      </Button>
    </Stack>
  );
};
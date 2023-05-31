import {SearchParams} from '../pages/SearchingPage';
import {Button, Stack} from '@mui/material';
import {makeStyles} from 'tss-react/mui';
import {useEffect, useState} from 'react';

interface SearchingButtonsProps {
    params: SearchParams
    onChange: (params: SearchParams) => void;
}

const useStyles = makeStyles()((theme) => ({
    active: {
        background: theme.palette.primary.main
    },
    inactive: {
        background: "rgb(198 196 196)",
        '&:hover': {
            background: 'darkgrey',
        },
    },
    container: {
        width: "100%",
        alignItems: "center",
        padding: "0.5em 1em 4em 1em",
        backgroundColor: "white",
        boxShadow: "0 1px 1px 0 grey",
        borderRadius: "5px"
    },
    filtersHeader: {
        fontWeight: "bold",
        fontSize: "1.2em"
    },
    filterButton: {
        width: "85%",
        fontSize: "1em"
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
        <div className={classes.container}>
            <h2>Szukaj w:</h2>

            <Stack direction={"column"} spacing={2.5} style={{alignItems: "center"}}>
            <Button variant={'contained'}
                    className={`${courses ? classes.active : classes.inactive} ${classes.filterButton}`}
                    onClick={() => setCourses(prevState => {
                        return !prevState;
                    })}>
                Kursy
            </Button>
            <Button variant={'contained'}
                    className={`${lecturers ? classes.active : classes.inactive} ${classes.filterButton}`}
                    onClick={() => setLecturers(prevState => {
                        return !prevState;
                    })}>
                Prowadzący
            </Button>

            <Button variant={'contained'}
                    className={`${threads ? classes.active : classes.inactive} ${classes.filterButton}`}
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
        </div>
    );
};
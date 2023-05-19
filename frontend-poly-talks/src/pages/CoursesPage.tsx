import {Divider, List} from '@mui/material';
import {makeStyles} from "tss-react/mui";
import React from "react";
import {Link} from "react-router-dom";
import {CourseDto} from "../dto/course.dto";

const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    }
}));

export const CoursesPage = () => {
    const {classes, cx} = useStyles(undefined, undefined);
    const [courses, setCourses] = React.useState<CourseDto[]>([])


    React.useEffect(() => {
        fetch('http://localhost:8080/api/course')
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div style={{margin: '0 2em', display: 'flex', flexDirection: 'column', gap: '0.3em'}}>
            <h1 className={`${classes.red}`} style={{fontWeight: 'bold'}}>Kursy</h1>
            <List component="nav">
                {courses.map(course => (<>
                        <Link to={`/course/${course._id}`}>
                            <h3>{course.name} {course.code}</h3>
                        </Link>
                        <Divider/>
                    </>
                ))}
            </List>
        </div>
    );
};
import {Card, CardContent, IconButton, Input, List, Paper} from '@mui/material';
import {makeStyles} from "tss-react/mui";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {CourseDto} from "../dto/course.dto";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    }
}));

export const CoursesPage = () => {
    const {classes, cx} = useStyles(undefined, undefined);
    const [courses, setCourses] = React.useState<CourseDto[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCourses = courses.filter(c => (c.name + c.code).toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


    React.useEffect(() => {
        fetch('http://localhost:8080/api/course')
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div style={{margin: '0 2em', display: 'flex', flexDirection: 'column', gap: '0.3em'}}>
            <h1 className={`${classes.red}`} style={{fontWeight: 'bold'}}>Kursy</h1>
            <Paper
                component="form"
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, justifyContent: "space-between"}}
            >
                <Input sx={{flexGrow: 1}} type="text" value={searchTerm} onChange={handleSearchChange}
                       placeholder="Szukaj po tytule"/>
                <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </Paper>
            <List component="nav">
                {filteredCourses.map(course => (<>
                        <Card style={{marginBottom: "0.5em"}}><CardContent>
                            <Link style={{textDecoration: "none", color: "black"}} to={`/courses/${course._id}`}>
                                <h3>{course.name} {course.code}</h3>
                            </Link>
                        </CardContent></Card>
                    </>
                ))}
            </List>
        </div>
    );
};
import {makeStyles} from "tss-react/mui";
import React from "react";
import {useParams} from "react-router";
import {CourseDto} from "../dto/course.dto";
import {Button, Card, CardContent} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    },
    header: {
        display: "flex",
        alignItems: "baseline"
    },
    maxWidth: {
        width: '100%'
    },
}));

export const SingleCourse = () => {
    const {classes, cx} = useStyles(undefined, undefined);
    const [course, setCourse] = React.useState<CourseDto | null>(null);
    const navigate = useNavigate();
    const {id} = useParams();

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        fetch(`http://localhost:8080/api/course/${id}`)
            .then(response => response.json())
            .then(data => setCourse(data))
            .catch(error => console.error(error));
    }

    return (
        <div style={{padding: '1em 2em', paddingBottom: '4em', display: 'flex', flexDirection: 'column', gap: '0.15em'}}>
            <Button
                variant="contained"
                style={{position: "fixed", bottom: "20px", right: "20px"}}
                onClick={() => {window.scrollTo(0,0)}}
            >Powrót do góry</Button>
            <Card style={{ boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.32), 0px 1px 1px 0px rgba(0,0,0,0.32), 0px 1px 3px 0px rgba(0,0,0,0.28)"}} >
                <CardContent>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div>
                            <h1 className={`${classes.red}`} style={{fontWeight: 'bold', marginBottom: "0px"}}>{course?.name} | {course?.code}</h1>
                            <h3 className={`${classes.red}`} style={{fontWeight: 'bold', margin: "0"}}>{course?.major}</h3>
                        </div>
                        <Button
                            onClick={() => navigate(`/courses/${id}/attachments`)}
                            variant="contained"
                            startIcon={<AttachFileIcon />}>
                            Pliki
                        </Button>
                    </div>
                    <p>{course?.description}</p>
                </CardContent>
            </Card>
        </div>
    );
};
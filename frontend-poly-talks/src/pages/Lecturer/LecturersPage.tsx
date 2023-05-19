import React from "react";
import {LecturerDto} from "../../dto/lecturer.dto";
import {makeStyles} from "tss-react/mui";
import {Divider, List} from "@mui/material";
import {Link} from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    }
}));

export const LecturersPage = () => {
    const {classes, cx} = useStyles(undefined, undefined);
    const [lecturers, setLecturer] = React.useState<LecturerDto[]>([])


    React.useEffect(() => {
        fetch('http://localhost:8080/api/lecturer')
            .then(response => response.json())
            .then(data => setLecturer(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div style={{margin: '0 2em', display: 'flex', flexDirection: 'column', gap: '0.3em'}}>
            <h1 className={`${classes.red}`} style={{fontWeight: 'bold'}}>Prowadzący</h1>
            <List component="nav">
                {lecturers.map(lecturer => (<>
                        <Link style={{textDecoration: "none", color: "black"}} to={`/lecturer/${lecturer._id}`}>
                            <h3>{lecturer.name} {lecturer.surname}</h3>
                        </Link>
                        <Divider/>
                    </>
                ))}
            </List>
        </div>
    );
};
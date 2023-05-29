import React, {useState} from "react";
import {LecturerDto} from "../../dto/lecturer.dto";
import {makeStyles} from "tss-react/mui";
import {Divider, IconButton, Input, List, Paper} from "@mui/material";
import {Link} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    }
}));

export const LecturersPage = () => {
    const {classes, cx} = useStyles(undefined, undefined);
    const [lecturers, setLecturer] = React.useState<LecturerDto[]>([])
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLecturers = lecturers.filter(l => (l.name +" "+ l.surname).toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    React.useEffect(() => {
        fetch('http://localhost:8080/api/lecturer')
            .then(response => response.json())
            .then(data => setLecturer(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div style={{margin: '0 2em', display: 'flex', flexDirection: 'column', gap: '0.3em'}}>
            <h1 className={`${classes.red}`} style={{fontWeight: 'bold'}}>Prowadzący</h1>
            <Paper
                component="form"
                sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, justifyContent: "space-between"}}
            >
                <Input sx={{flexGrow: 1}} type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Szukaj po tytule"/>
                <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </Paper>
            <List component="nav">
                {filteredLecturers.map(lecturer => (<>
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
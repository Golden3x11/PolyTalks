import {Card, CardContent, Divider, IconButton, Input, List, Paper} from '@mui/material';
import React, {useState} from "react";
import {makeStyles} from "tss-react/mui";
import {ThreadDto} from "../dto/thread.dto";
import {Link} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    }
}));


export const ThreadsPage = () => {
    const {classes, cx} = useStyles(undefined, undefined);
    const [threads, setThreads] = React.useState<ThreadDto[]>([])
    const [searchTerm, setSearchTerm] = useState('');

    const filteredThreads = threads.filter(thread => thread.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    React.useEffect(() => {
        fetch('http://localhost:8080/api/thread')
            .then(response => response.json())
            .then(data => setThreads(data))
            .catch(error => console.error(error));
    }, []);


    return (
        <div style={{margin: '0 2em', display: 'flex', flexDirection: 'column', gap: '0.3em'}}>
            <h1 className={`${classes.red}`} style={{fontWeight: 'bold'}}>Wątki</h1>
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
                {filteredThreads.map(thread => (<>
                    <Card style={{marginBottom: "0.5em"}}><CardContent>

                    <Link style={{textDecoration: "none", color: "black"}} to={`/threads/${thread._id}`}>
                            <h3>{thread.title}</h3>
                            <p>{thread.description}</p>
                        </Link>
                    </CardContent></Card>
                    </>
                ))}
            </List>
        </div>
    );
};
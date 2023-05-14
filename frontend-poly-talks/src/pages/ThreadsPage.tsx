import {Divider, List} from '@mui/material';
import React from "react";
import {makeStyles} from "tss-react/mui";
import {ThreadDto} from "../dto/thread.dto";
import {Link} from "react-router-dom";


const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    }
}));


export const ThreadsPage = () => {
    const {classes, cx} = useStyles(undefined, undefined);
    const [threads, setThreads] = React.useState<ThreadDto[]>([])


    React.useEffect(() => {
        fetch('http://localhost:8080/api/thread')
            .then(response => response.json())
            .then(data => setThreads(data))
            .catch(error => console.error(error));
    }, []);


    return (
        <div style={{margin: '1em 2em', display: 'flex', flexDirection: 'column', gap: '0.3em'}}>
            <h1 className={`${classes.red}`} style={{fontWeight: 'bold'}}>Wątki</h1>
            <List component="nav">
                {threads.map(thread => (<>
                        <Link to={`/threads/${thread._id}`}>
                            <h3>{thread.title}</h3>
                            <p>{thread.description}</p>
                        </Link>
                        <Divider/>
                    </>
                ))}
            </List>
        </div>
    );
};
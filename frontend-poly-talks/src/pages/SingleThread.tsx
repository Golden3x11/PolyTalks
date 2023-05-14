import {useParams} from "react-router";
import {makeStyles} from "tss-react/mui";
import {ThreadDto} from "../dto/thread.dto";
import React from "react";
import {Divider} from "@mui/material";


const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    }
}));


export const SingleThread = () => {
    const {classes, cx} = useStyles(undefined, undefined);
    const [thread, setThread] = React.useState<ThreadDto| null>(null);

    const {id} = useParams();

    React.useEffect(() => {
        fetch(`http://localhost:8080/api/thread/${id}`)
            .then(response => response.json())
            .then(data => setThread(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div style={{margin: '1em 2em', display: 'flex', flexDirection: 'column', gap: '0.3em'}}>
            <h1 className={`${classes.red}`} style={{fontWeight: 'bold'}}>{thread?.title}</h1>
            <p>{thread?.description}</p>
            <Divider/>
        </div>
    );
};
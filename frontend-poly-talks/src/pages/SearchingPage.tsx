import {useParams} from 'react-router';
import React, {useEffect, useState} from 'react';
import {SearchResultDto} from '../dto/search-result.dto';
import {makeStyles} from 'tss-react/mui';
import {Link} from 'react-router-dom';
import {Avatar, Button, Card, CardContent, List, Stack} from '@mui/material';
import {SearchingButtons} from '../components/SearchingButtons';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import TagIcon from "@mui/icons-material/Tag";

export interface SearchParams {
    lecturers: string;
    courses: string;
    threads: string;
    searchByTags: string;
}

const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    }
}));

export const SearchingPage = () => {
    const {classes} = useStyles();
    const {query} = useParams()
    const [searchParams, setSearchParams] = useState<SearchParams>({
        lecturers: "true",
        courses: "true",
        threads: "true",
        searchByTags: "true"
    })
    const [results, setResults] = useState<SearchResultDto | undefined>(undefined)
    const isResultEmpty = (res?: SearchResultDto) => {
        if (!res) return true;

        return !res?.lecturers.length && !res?.courses.length && !res?.threads.length;
    }

    useEffect(() => {
        let url = `http://localhost:8080/api/search?query=${query}&lecturers=${searchParams.lecturers}&courses=${searchParams.courses}&threads=${searchParams.threads}&searchByTags=${searchParams.searchByTags}`;
        fetch(url, {
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => response.json())
            .then(setResults);
    }, [query, searchParams.courses, searchParams.lecturers, searchParams.searchByTags, searchParams.threads]);

    return (
        <div style={{margin: '0 2em', display: 'grid', gridTemplateColumns: "80% 20%"}}>
            <div style={{margin: '0 2em', display: 'flex', flexDirection: 'column', gap: '0.3em'}}>
                <h1 className={classes.red} style={{fontWeight: 'bold'}}>Wyszukiwanie: {query}</h1>

                {isResultEmpty(results) && <h4>Brak wyników...</h4>}

                <List component="nav">
                    {results?.courses.map(course => (<>
                            <Card style={{marginBottom: "0.5em"}}><CardContent>
                                <Link style={{
                                    textDecoration: "none",
                                    color: "black",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1em"
                                }} to={`/courses/${course._id}`}>
                                    <Avatar>
                                        <MenuBookIcon/>
                                    </Avatar>                            <h3>{course.name} | {course.code}</h3>
                                </Link>
                            </CardContent></Card>
                        </>
                    ))}
                    {results?.threads.map(thread => (<>
                            <Card style={{marginBottom: "0.5em"}}><CardContent>
                                <Link style={{
                                    textDecoration: "none",
                                    color: "black",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1em"
                                }} to={`/threads/${thread._id}`}>
                                    <Avatar>
                                        <TagIcon/>
                                    </Avatar>
                                    <h3>{thread.title}</h3>
                                </Link>
                            </CardContent></Card>
                        </>
                    ))}
                    {results?.lecturers.map(lecturer => (<>
                            <Card style={{marginBottom: "0.5em"}}><CardContent>
                                <Link style={{
                                    textDecoration: "none",
                                    color: "black",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1em"
                                }} to={`/lecturer/${lecturer._id}`}>
                                    <Avatar>
                                        <PersonIcon/>
                                    </Avatar>
                                    <h3>{lecturer.name} {lecturer.surname}</h3>
                                </Link>
                            </CardContent></Card>
                        </>
                    ))}
                </List>
            </div>
            <div style={{position: "fixed", top: "10em", right: "2em", width: "15%"}}>
                <SearchingButtons params={searchParams} onChange={setSearchParams}/>
            </div>
            <div style={{position: "fixed", bottom: "20px", right: "2em", width: "15%"}}>
                <Stack style={{padding: "2em 1em 0 1em"}}>
                    <Button
                        variant="contained"
                        style={{fontSize: "1em"}}
                        onClick={() => {
                            window.scrollTo(0, 0);
                        }}>
                        Powrót do góry
                    </Button>
                </Stack>
            </div>
        </div>
    );
};
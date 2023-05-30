import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { SearchResultDto } from '../dto/search-result.dto';
import { makeStyles } from 'tss-react/mui';
import { Link } from 'react-router-dom';
import { Divider, List } from '@mui/material';
import { SearchingButtons } from '../components/SearchingButtons';

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
  const { query } = useParams()
  const [searchParams, setSearchParams] = useState<SearchParams>({
    lecturers: "true",
    courses: "true",
    threads: "true",
    searchByTags: "true"
  })
  const [results, setResults] = useState<SearchResultDto | undefined>(undefined)
  const isResultEmpty = (res?: SearchResultDto) => {
    if(!res) return true;

    return !res?.lecturers.length && !res?.courses.length && !res?.threads.length;
  }

  useEffect(() => {
    let url = `http://localhost:8080/api/search?query=${query}&lecturers=${searchParams.lecturers}&courses=${searchParams.courses}&threads=${searchParams.threads}&searchByTags=${searchParams.searchByTags}`;
    fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(setResults);
  }, [query, searchParams.courses, searchParams.lecturers, searchParams.searchByTags, searchParams.threads]);

  return (
    <div style={{margin: '0 2em', display: 'flex', flexDirection: 'column', gap: '0.3em'}}>
      <h1 className={classes.red} style={{fontWeight: 'bold'}}>Wyszukiwanie: {query}</h1>

      <SearchingButtons params={searchParams} onChange={setSearchParams}/>

      {isResultEmpty(results) && <h4>Brak wyników...</h4>}

      <List component="nav">
        {results?.courses.map(course => (<>
            <Link style={{textDecoration: "none", color: "black"}} to={`/courses/${course._id}`}>
              <h3>Kurs: {course.name} {course.code}</h3>
            </Link>
            <Divider/>
          </>
        ))}
        {results?.threads.map(thread => (<>
            <Link style={{textDecoration: "none", color: "black"}} to={`/threads/${thread._id}`}>
              <h3>{thread.title}</h3>
              <p>{thread.description}</p>
            </Link><Divider/>
          </>
        ))}
        {results?.threads.map(thread => (<>
            <Link style={{textDecoration: "none", color: "black"}} to={`/threads/${thread._id}`}>
              <h3>{thread.title}</h3>
              <p>{thread.description}</p>
            </Link><Divider/>
          </>
        ))}
        {results?.lecturers.map(lecturer => (<>
            <Link style={{textDecoration: "none", color: "black"}} to={`/lecturer/${lecturer._id}`}>
              <h3>Prowadzący: {lecturer.name} {lecturer.surname}</h3>
            </Link>
            <Divider/>
          </>
        ))}
      </List>
    </div>
  );
};
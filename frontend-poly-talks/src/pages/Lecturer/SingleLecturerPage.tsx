import React from 'react';
import {useParams} from 'react-router-dom';
import {makeStyles} from "tss-react/mui";
import {LecturerDto} from "../../dto/lecturer.dto";
import {Divider} from "@mui/material";
import {RatingBoxCreate} from "../../components/Rating/RatingBoxCreate";
import {RatingDto} from "../../dto/rating.dto";
import {SingleRating} from "../../components/Rating/SingleRating";


const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    }
}));

export const SingleLecturerPage = () => {
    const {classes, cx} = useStyles(undefined, undefined);
    const [lecturer, setLecturer] = React.useState<LecturerDto | null>(null);
    const [ratings, setRatings] = React.useState<RatingDto[]>([]);

    const {id} = useParams<{ id: string }>();

    React.useEffect(() => {
        fetch(`http://localhost:8080/api/lecturer/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setLecturer(data);
                setRatings(data.ratings);
            })
            .catch((error) => console.error(error));
    }, [id]);

    return (
        <div style={{margin: '0.3em 4em', display: 'flex', flexDirection: 'column'}}>
            <p className={`${classes.red}`}
               style={{fontSize: 45, fontWeight: 'bold', marginBottom: 0, marginTop: '0.5em'}}>{lecturer?.surname}</p>
            <p className={`${classes.red}`} style={{fontSize: 30, marginTop: 0, marginBottom: 0}}>{lecturer?.name}</p>
            <p style={{fontSize: 20, marginTop: '0.2em'}}>{lecturer?.email}</p>
            <RatingBoxCreate id={id}/>
            <div style={{marginBottom: '2em'}}/>
            <Divider/>
            <div style={{marginBottom: '2em'}}/>
            {ratings.map((rating) => (
                <SingleRating rating={rating} />
            ))}
        </div>
    );
};
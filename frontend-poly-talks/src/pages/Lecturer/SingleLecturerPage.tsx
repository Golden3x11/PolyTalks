import React from 'react';
import {useParams} from 'react-router-dom';
import {makeStyles} from "tss-react/mui";
import {LecturerDto} from "../../dto/lecturer.dto";
import {Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Divider, Typography} from "@mui/material";
import {RatingBoxCreate} from "../../components/Rating/RatingBoxCreate";
import {RatingDto} from "../../dto/rating.dto";
import {SingleRating} from "../../components/Rating/SingleRating";
import {Add} from "@mui/icons-material";


const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    }
}));

export const SingleLecturerPage = () => {
    const {classes, cx} = useStyles(undefined, undefined);
    const [lecturer, setLecturer] = React.useState<LecturerDto | null>(null);
    const [ratings, setRatings] = React.useState<RatingDto[]>([]);
    const [isAccordionOpen, setIsAccordionOpen] = React.useState(false);

    const {id} = useParams<{ id: string }>();

    const handleRatingCreated = () => {
        setIsAccordionOpen(false);
        fetchData();
    };

    React.useEffect(() => {
        fetchData()
    }, [id]);

    const fetchData = async () => {
        fetch(`http://localhost:8080/api/lecturer/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setLecturer(data);
                setRatings(data.ratings);
            })
            .catch((error) => console.error(error));
    }
        return (
        <div style={{padding: '1em 2em', display: 'flex', flexDirection: 'column', gap: '2em'}}>
            <Card>
                <CardContent>
                    <p className={`${classes.red}`}
                       style={{
                           fontSize: 45,
                           fontWeight: 'bold',
                           marginBottom: 0,
                           marginTop: '0em'
                       }}>{lecturer?.surname}</p>
                    <p className={`${classes.red}`}
                       style={{fontSize: 30, marginTop: 0, marginBottom: 0}}>{lecturer?.name}</p>
                    <p style={{fontSize: 20, marginTop: '0.2em'}}>{lecturer?.email}</p>
                </CardContent>
            </Card>
            <Accordion expanded={isAccordionOpen}>
                <AccordionSummary
                    expandIcon={<Add/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                >
                    <Typography>Podziel się z nami opinią na temat prowadzącego :)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RatingBoxCreate id={id} handleRatingCreated={handleRatingCreated}/>
                </AccordionDetails>
            </Accordion>
            {ratings.map((rating) => (
                <SingleRating rating={rating}/>
            ))}
        </div>
    );
};
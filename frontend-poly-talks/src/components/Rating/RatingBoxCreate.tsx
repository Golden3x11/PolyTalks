import React, {useState} from 'react';
import {StarRating} from './StarRating';
import {Button, TextField} from "@mui/material";
import {makeStyles} from "tss-react/mui";


const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    },
    textInput: {
        width: '100%'
    },
    textTopic: {
        fontSize: 'larger',
        fontWeight: 'bold'
    }
}));

interface RatingBoxCreateProps {
    id: string | undefined;
}

export const RatingBoxCreate = (props : RatingBoxCreateProps) => {
    const { id } = props;
    const {classes, cx} = useStyles(undefined, undefined);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");

    const [ratingValues, setRatingValues] = useState({
        difficulty: 0,
        knowledge: 0,
        communication: 0,
        friendliness: 0,
    });

    const handleRatingChange = (category: string, rating: number) => {
        setRatingValues((prevValues) => ({
            ...prevValues,
            [category]: rating,
        }));
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }

    const addRating = () => {
        const url = "http://localhost:8080/api/lecturer/" + id + "/ratings";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                rating_difficulty: ratingValues.difficulty,
                rating_knowledge: ratingValues.knowledge,
                rating_communication: ratingValues.communication,
                rating_friendliness: ratingValues.friendliness
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Rating added successfully:', data);
            })
            .catch(error => console.error('Error while adding rating:', error));
    };

    return (
        <div>
            <p style={{fontSize: 17}}>Podziel się z nami opinią na temat prowadzącego :)</p>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                <tr>
                    <th style={{
                        backgroundColor: '#f2f2f2',
                        padding: '10px',
                        textAlign: 'center',
                        border: '1px solid #ccc'
                    }}>Trudność zdania
                    </th>
                    <th style={{
                        backgroundColor: '#f2f2f2',
                        padding: '10px',
                        textAlign: 'center',
                        border: '1px solid #ccc'
                    }}>Wiedza
                    </th>
                    <th style={{
                        backgroundColor: '#f2f2f2',
                        padding: '10px',
                        textAlign: 'center',
                        border: '1px solid #ccc'
                    }}>Komunikatywność
                    </th>
                    <th style={{
                        backgroundColor: '#f2f2f2',
                        padding: '10px',
                        textAlign: 'center',
                        border: '1px solid #ccc'
                    }}>Podejście do studenta
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style={{padding: '10px', textAlign: 'center', border: '1px solid #ccc'}}>
                        <StarRating
                            value={ratingValues.difficulty}
                            onRatingChange={(rating) =>
                                handleRatingChange('difficulty', rating)
                            }
                        />
                    </td>
                    <td style={{padding: '10px', textAlign: 'center', border: '1px solid #ccc'}}>
                        <StarRating
                            value={ratingValues.knowledge}
                            onRatingChange={(rating) =>
                                handleRatingChange('knowledge', rating)
                            }
                        />
                    </td>
                    <td style={{padding: '10px', textAlign: 'center', border: '1px solid #ccc'}}>
                        <StarRating
                            value={ratingValues.communication}
                            onRatingChange={(rating) =>
                                handleRatingChange('communication', rating)
                            }
                        />
                    </td>
                    <td style={{padding: '10px', textAlign: 'center', border: '1px solid #ccc'}}>
                        <StarRating
                            value={ratingValues.friendliness}
                            onRatingChange={(rating) =>
                                handleRatingChange('friendliness', rating)
                            }
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <div>
                <h2 className={classes.red}>Tytuł</h2>
                <TextField
                    className={classes.textInput}
                    id="outlined-basic"
                    label="Wpisz jakiś tytuł"
                    variant="outlined"
                    required
                    value={title}
                    onChange={handleTitleChange}
                    InputProps={{className: classes.textTopic}}
                />
            </div>
            <div>
                <h2 className={classes.red}>Opis</h2>
                <TextField
                    className={classes.textInput}
                    id="outlined-multiline-static"
                    label="Napisz coś co może pomóc albo i nie w wyborze"
                    variant="outlined"
                    required
                    multiline
                    rows={5}
                    value={description}
                    onChange={handleDescriptionChange}
                    InputProps={{className: classes.textTopic}}
                />
            </div>
            <Button
                variant="contained"
                style={{fontSize: "1.15rem", alignSelf: "flex-end", marginTop: "1em"}}
                disabled={title === "" || description === "" || ratingValues.knowledge === 0
                || ratingValues.friendliness === 0 || ratingValues.communication === 0
                || ratingValues.difficulty === 0}
                onClick={addRating}
            >
                Dodaj opinię
            </Button>
        </div>
    );
};
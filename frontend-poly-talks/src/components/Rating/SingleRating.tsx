import {RatingDto} from "../../dto/rating.dto";
import React from "react";
import StarIcon from '@mui/icons-material/Star';
import {makeStyles} from "tss-react/mui";
import {Avatar, Card, CardContent} from "@mui/material";

interface SingleRatingProps {
    rating: RatingDto;
}

const useStyles = makeStyles()((theme) => ({
    red: {
        color: theme.palette.primary.main
    }
}));

export const SingleRating: React.FC<SingleRatingProps> = ({rating}) => {
    const {classes, cx} = useStyles(undefined, undefined);

    const dateToLocale = (date: Date) => {
        return new Date(date).toLocaleString();
    }

    return (
        <Card>
            <CardContent>
                <h3 style={{marginTop: '0'}}>{rating.title}</h3>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                    gap: '0.4em'
                }}>
                    <Avatar
                        className="user-icon"
                        src={`/avatar-${rating?.author.avatar}.jpg`}
                    />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                        <p style={{margin: 0}}>{rating?.author.username}</p>
                        <p style={{margin: 0, fontSize: '0.85rem'}}>{dateToLocale(rating?.creationDate)}</p>
                    </div>
                </div>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginTop: '10px',
                }}>
                    <thead>
                    <tr>
                        <th style={{
                            backgroundColor: '#f2f2f2',
                            padding: '10px',
                            textAlign: 'center',
                            border: '1px solid #ccc',
                        }}>Trudność zdania
                        </th>
                        <th style={{
                            backgroundColor: '#f2f2f2',
                            padding: '10px',
                            textAlign: 'center',
                            border: '1px solid #ccc',
                        }}>Wiedza
                        </th>
                        <th style={{
                            backgroundColor: '#f2f2f2',
                            padding: '10px',
                            textAlign: 'center',
                            border: '1px solid #ccc',
                        }}>Komunikatywność
                        </th>
                        <th style={{
                            backgroundColor: '#f2f2f2',
                            padding: '10px',
                            textAlign: 'center',
                            border: '1px solid #ccc',
                        }}>Podejście do studenta
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={{padding: '10px', textAlign: 'center', border: '1px solid #ccc'}}>
                            {Array.from({length: rating.rating_difficulty}).map((_, index) => (
                                <StarIcon key={index} className={`${classes.red}`}/>
                            ))}
                        </td>
                        <td style={{padding: '10px', textAlign: 'center', border: '1px solid #ccc'}}>
                            {Array.from({length: rating.rating_knowledge}).map((_, index) => (
                                <StarIcon key={index} className={`${classes.red}`}/>
                            ))}
                        </td>
                        <td style={{padding: '10px', textAlign: 'center', border: '1px solid #ccc'}}>
                            {Array.from({length: rating.rating_communication}).map((_, index) => (
                                <StarIcon key={index} className={`${classes.red}`}/>
                            ))}
                        </td>
                        <td style={{padding: '10px', textAlign: 'center', border: '1px solid #ccc'}}>
                            {Array.from({length: rating.rating_friendliness}).map((_, index) => (
                                <StarIcon key={index} className={`${classes.red}`}/>
                            ))}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p className="rating-description">{rating.description}</p>
            </CardContent>
        </Card>
    );
};
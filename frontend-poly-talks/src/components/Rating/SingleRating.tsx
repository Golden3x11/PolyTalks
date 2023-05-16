import {RatingDto} from "../../dto/rating.dto";
import React from "react";
import StarIcon from '@mui/icons-material/Star';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {makeStyles} from "tss-react/mui";

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

    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
        }}>
            <h3 style={{marginTop: '0'}}>{rating.title}</h3>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
            }}>
                <AccountCircleIcon style={{marginRight: '5px'}} className="user-icon"/>
                <span className="author-name">{rating.author}</span>
            </div>
            <p className="rating-description">{rating.description}</p>
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
        </div>
    );
};
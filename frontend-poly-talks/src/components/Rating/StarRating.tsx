import React, { useState } from 'react';

interface StarProps {
    filled: boolean;
    onClick: () => void;
}

interface StarRatingProps {
    value: number;
    onRatingChange: (rating: number) => void;
}

export const StarRating = ({ value, onRatingChange }: StarRatingProps) => {
    const [rating, setRating] = useState(value);

    const handleStarClick = (value: number) => {
        setRating(value);
        onRatingChange(value);
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map((value) => (
                <Star
                    key={value}
                    filled={value <= rating}
                    onClick={() => handleStarClick(value)}
                />
            ))}
        </div>
    );
};

const Star = ({ filled, onClick }: StarProps) => {
    const starStyle = {
        cursor: 'pointer',
        color: filled ? '#e15050' : 'gray',
        fontSize: '2em'
    };

    return (
        <span style={starStyle} onClick={onClick}>
      &#9733;
    </span>
    );
};
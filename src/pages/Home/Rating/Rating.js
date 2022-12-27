import React from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ratings, ratingsCount}) => {
    return (
        <div>
            <FaStar size={25} className="mx-1 star" color={ratings >= 1 ? '#ffc107' : '#e4e5e9'}></FaStar>
        </div>
    );
};

export default Rating;
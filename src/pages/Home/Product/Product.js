import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Rating from '../Rating/Rating';
import './product.css';

const Product = ({ product }) => {
    const { _id, title, img, price, ratings, ratingsCount } = product;

    // const [rating, setRating] = useState(null);
    return (
        <div className="card w-96 bg-base-100 shadow-xl pro p-5 mx-auto">
            <figure className="px-10 py-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <div className='flex'>
                    {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (

                            <label>
                                {/* <input type="radio" name="rating" className='hidden' value={ratingValue} onClick={() => setRating(ratingValue)} /> */}
                                <FaStar size={25} className="mx-1 star" color={ratingValue <= ratings ? '#ffc107' : '#e4e5e9'}></FaStar>
                            </label>
                        )
                    })}
                    {/* <Rating
                        ratings={ratings}
                        ratingsCount={ratingsCount}
                    ></Rating> */}
                </div>
                <h2 className="card-title not-italic font-bold text-2xl">{title}</h2>
                <p className='text-xl font-semibold '>$ {price}</p>
            </div>
        </div>
    );
};

export default Product;
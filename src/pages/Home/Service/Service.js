import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Service = ({ service }) => {
    const { _id, title, img, price } = service;
    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl sm:mx-auto">
            <figure><img src={img} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="card-actions justify-between">
                    <p className='text-2xl font-bold text-orange-600'><strong>Price: </strong>${price}</p>
                    {/* <Link to={`/checkout/${_id}`} className="text-white-300 text-xl btn btn-primary">Checkout</Link> */}
                    <Link to={`/serviceDetail/${_id}`} className="text-white-300 text-xl text-orange-600"><FaArrowRight/></Link>
                </div>
            </div>
        </div>
    );
};

export default Service;
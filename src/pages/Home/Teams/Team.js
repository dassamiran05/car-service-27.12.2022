import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './team.css';

const Team = ({t}) => {
    const {id, name, img, designation} = t;
    return (
        <div className="card w-full bg-base-100 shadow-xl p-5 mx-auto" style={{borderColor:"#f3f3f3",borderWidth:'1px'}}>
            <figure className="">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title not-italic font-bold text-2xl">{name}</h2>
                <p className='text-xl font-semibold '>{designation}</p>
            </div>
            <div className='mx-auto flex justify-center items-center social'>
                <Link to="#"><FaFacebookF/></Link>
                <Link to="#"><FaTwitter/></Link>
                <Link to="#"><FaLinkedinIn/></Link>
                <Link to="#"><FaInstagram/></Link>
            </div>
        </div>
    );
};

export default Team;
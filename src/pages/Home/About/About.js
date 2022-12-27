import React from 'react';
import img1 from '../../../assets/images/about_us/parts.jpg';
import img2 from '../../../assets/images/about_us/person.jpg';

const About = () => {
    return (
        <div className="hero my-20">
            <div className="hero-content flex-col lg:flex-row">
                <div className='w-1/2 relative'>
                    <img src={img2} className="w-4/5 h-full max-w-sm rounded-lg shadow-2xl" alt="" />
                    <img src={img1} className="absolute w-1/2 right-36 top-1/2 max-w-sm rounded-lg shadow-2xl border-8 border-white" alt="" />
                </div>
                <div className='w-1/2'>
                    <p className='text-2xl text-orange-600 font-bold'>About us</p>
                    <h1 className="text-5xl font-bold">We are qualified<br/> & of experience<br/> in this field</h1>
                    <p className="py-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                    <p className="py-6">the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                    <button className="btn btn-warning">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default About;
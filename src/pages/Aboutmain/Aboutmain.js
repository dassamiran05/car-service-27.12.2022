import React from 'react';
import MyBackgroundImage from '../../assets/images/banner/2.jpg';
import img1 from '../../assets/images/about_us/parts.jpg';
import img2 from '../../assets/images/about_us/person.jpg';
import Products from '../Home/Products/Products';
import Teams from '../Home/Teams/Teams';
import Calltoaction from '../Home/Calltoaction/Calltoaction';
const Aboutmain = () => {
    return (
        <>
            <div className='w-full h-96 pl-8 flex items-center relative rounded mb-24 mt-8 banner-sec' style={{backgroundImage:`url(${MyBackgroundImage})`}}>
                <h3 className='text-5xl text-white font-bold'>About us</h3>
                <div className='angle'><p>Home/Service Detail</p></div>
            </div>
            <div className="hero my-20">
                <div className="hero-content flex-col lg:flex-row">
                    <div className='w-1/2 pr-5'>
                        <p className='text-2xl text-orange-600 font-bold'>About us</p>
                        <h1 className="text-5xl font-bold">Lorem Ipsum is simply dummy text</h1>
                        <p className="py-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                        <p className="py-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                    </div>
                    <div className='w-1/2 relative'>
                        <img src={img2} className="w-4/5 h-full max-w-sm rounded-lg shadow-2xl" alt="" />
                        <img src={img1} className="absolute w-1/2 right-36 top-1/2 max-w-sm rounded-lg shadow-2xl border-8 border-white" alt="" />
                    </div>
                    
                </div>
            </div>
            <Calltoaction></Calltoaction>
            <Products></Products>
            <Teams></Teams>
        </>
    );
};

export default Aboutmain;
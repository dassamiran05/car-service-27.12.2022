import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './ServiceDetail.css';
import MyBackgroundImage from '../../../assets/images/banner/2.jpg';
import Sidebar from './Sidebar';

const ServiceDetail = () => {
    const serviceDetail = useLoaderData();
    const { _id, title, img, price, description, facility } = serviceDetail;

    
    return (
        <>
            <div className='w-full h-96 pl-8 flex items-center relative rounded mb-24 mt-8 banner-sec' style={{backgroundImage:`url(${MyBackgroundImage})`}}>
                <h3 className='text-5xl text-white font-bold'>Service Detail</h3>
                <div className='angle'><p>Home/Service Detail</p></div>
            </div>
            <div className="flex md:flex-row flex-col mb-16">
                <div className=' lg:w-3/4 sm:w-full mr-3'>
                    <div className='w-full'>
                        <img src={img} className='w-full rounded' alt={title} />
                    </div>
                    <div className='content mt-7'>
                        <h3 className='text-4xl leading-10 font-bold' style={{color:'#151515'}}>{title}</h3>
                        <p className='font-normal text-base leading-8 mt-7' style={{color:'#737373'}}>{description}</p>
                        <div className='grid grid-cols-2 gap-5 mt-7'>
                        {
                            facility?.map(f => {
                                return (
                                    <div className='p-3.5 border-t-[2px] rounded-md' style={{borderColor:'#ff3811',backgroundColor:'#f3f3f3'}}>
                                        <p className='font-bold text-xl lrading-6' style={{color:'#444'}}>{f.name}</p>
                                        <p className='font-normal text-base leading-7' style={{color:'#737373'}}>{f.details}</p>
                                    </div>
                                );
                            })
                        }
                        </div>
                    </div>
                </div>
                <Sidebar key={_id} id={_id} price={price}/>
            </div>
        </>
    );
};

export default ServiceDetail;
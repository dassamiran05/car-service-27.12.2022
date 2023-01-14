import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './ServiceDetail.css';
import Sidebar from './Sidebar';
import PageTitle from '../../../shared/pageTitle/PageTitle';
import PageBannerTitle from '../../../shared/PageBannerTitle/PageBannerTitle';

const ServiceDetail = () => {
    const serviceDetail = useLoaderData();
    const { _id, title, img, price, description, facility } = serviceDetail;

    
    return (
        <>
            <PageTitle title="Service detail"></PageTitle>
            <PageBannerTitle title="Service Detail" subtitle="Home/Service Detail"></PageBannerTitle>
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
                            facility?.map((f,i) => {
                                return (
                                    <div className='p-3.5 border-t-[2px] rounded-md' style={{borderColor:'#ff3811',backgroundColor:'#f3f3f3'}} key={i}>
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
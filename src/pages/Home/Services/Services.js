import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Service from '../Service/Service';
import './Services.css';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        // fetch('services.json').then(res => res.json()).then(data => setServices(data));
        fetch('http://localhost:5000/services').then(res => res.json()).then(data => setServices(data));
    }, []);
    return (
        <div className='my-20'>
            <div className='text-center'>
                <p className='text-2xl font-bold text-orange-600 leading-7'>Services</p>
                <h2 className='text-5xl font-bold'>Our Service Area</h2>
                <p className='w-1/2 mx-auto leading-7 my-5'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6  sm:mx-auto serv'>
                {
                    services.map(service => <Service
                        key={service._id}
                        service={service}
                    ></Service>)
                }

            </div>
            <div className='my-5 text-center'>
                <Link to="#"><button className="btn btn-outline btn-warning">More Services</button></Link>
            </div>
        </div>
    );
};

export default Services;
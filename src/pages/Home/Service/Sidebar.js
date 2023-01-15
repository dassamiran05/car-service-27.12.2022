import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';

const Sidebar = ({id, price}) => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://car-service-server-main.vercel.app/services').then(res => res.json()).then(data => setServices(data));
    }, []);
    return (
        <div className=' lg:w-1/4 sm:w-full'>
                    <div className='p-4' style={{backgroundColor:'#f3f3f3'}}>
                        <p className='font-bold text-2xl leading-6' style={{color:'#151515'}}>Services</p>
                        <ul className='mt-2.5'>
                        {
                            services.map(serv => {
                                return (
                                    <Link to={`/serviceDetail/${serv._id}`} key={serv._id}><li className='font-semibold text-base leading-5 p-3.5 w-full mb-1.5' style={{backgroundColor:'#fff',color:'#151515'}}>{serv.title}</li></Link>
                                );
                            })
                        }
                        </ul>
                    </div>
                    <div className='p-12 mt-4 rounded text-center' style={{backgroundColor:'#151515'}}>
                        <img src={logo} alt='' className='mx-auto' />
                        <p className='font-bold text-xl leading-9 my-4' style={{color:'#fff'}}>Need help? We are here to help you</p>
                        <div className='p-5 flex flex-col justify-center text-center rounded' style={{backgroundColor:'#fff'}}>
                            <p className='text-xl font-bold leading-9' style={{color:'#151515'}}><span style={{color:'#FF3811'}}>Car Doctor</span> special</p>
                            <p  className='text-base font-bold leading-9' style={{color:'#FF3811'}}><span style={{color:'#737373'}}>Save upto</span> 20% off</p>
                            <Link to="/contact"><button className='p-3 font-semibold text-lg leading-5 rounded' style={{backgroundColor:'#FF3811', color:'#fff', marginBottom:'-40px'}}>Get a quote</button></Link>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <p className='text-4xl font-bold leading-10 ' style={{color:'#151515'}}>Price : $ {price}</p>
                        <Link to={`/checkout/${id}`}><button className='font-bold text-lg leading-5 mt-7 p-4 w-full rounded' style={{backgroundColor:'#FF3811', color:'#fff'}}>Proceed Checkout</button></Link>
                    </div>
                </div>
    );
};

export default Sidebar;
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Manageservices = () => {
    const [services, setServices] = useState([]);
    // const [allorderloading, setAllOrderLoading] = useState(false);

    
    console.log(services);
    useEffect(() => {
        function getAllservicesbyadmin(){
            // setAllOrderLoading(true);
            fetch('http://localhost:5000/admin/services', 
            {
                headers:{
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            }
            )
            .then(res => res.json())
            .then(data => {
                setServices(data);
                // setAllOrderLoading(false);
            });
        }
        getAllservicesbyadmin();
    }, [])


    const handleDeleteService = id =>{
        const proceed = window.confirm('Are you sure want to delete this Service');
        if (proceed) {
            fetch(`http://localhost:5000/admin/service/${id}`, {
                method: 'DELETE',
                headers:{
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    toast.success('Service deleted successfully');
                    const remaining = services.filter(service => service._id !== id);
                    setServices(remaining);
                })
        }
    }
    return (
                <div className='my-12'>
                                <div className="overflow-x-auto w-full">
                                    <table className="table w-full">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <label>
                                                        <input type="checkbox" className="checkbox" />
                                                    </label>
                                                </th>
                                                <th>Service image</th>
                                                <th>Service name</th>
                                                <th>Price</th>
                                                <th>Message</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                services.map(service => {
                                                    return (
                                                        <>
                                                        <tr>
                                                            <th>
                                                                <label>
                                                                    <button className="btn btn-square btn-outline btn-error" onClick={() => handleDeleteService(service._id)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                                                    </button>
                                                                </label>
                                                            </th>
                                                            <td>
                                                                <div className="flex items-center space-x-3">
                                                                    <div className="avatar">
                                                                        <div className="rounded w-16 h-16">
                                                                            <img src={service.img} alt={service.title} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <strong>{service.title}</strong>
                                                            </td>
                                                            <td>
                                                                <span className="badge badge-ghost badge-sm">$ {service.price}</span>
                                                            </td>
                                                                <th>
                                                                    <Link to={`/serviceDetail/${service._id}`}><button className="btn btn-primary-ouyline">Details</button></Link>
                                                                </th>
                                                        </tr>
                                                        </>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>

                </div>
    );
};

export default Manageservices;
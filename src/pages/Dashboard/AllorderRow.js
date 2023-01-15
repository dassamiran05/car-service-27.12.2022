import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const AllorderRow = ({order, handleOrder}) => {
    const { _id, customer, email, phone, price, service, serviceName, paid } = order;
    const [orderService, setOrderService] = useState([]);

    useEffect(() => {
        fetch(`https://car-service-server-main.vercel.app/service/${service}`)
        .then(res => res.json())
        .then(data => setOrderService(data));
    }, [service]);

    
    return (
        <>
            <tr>
                <th>
                    <label>
                        <button className="btn btn-square btn-outline" onClick={() => handleOrder(_id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </label>
                </th>
                <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="rounded w-16 h-16">
                                {
                                    orderService?.img && <img src={orderService.img} alt={orderService.title} />
                                }
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">{customer}</div>
                            <div className="text-sm opacity-50">{phone}</div>
                        </div>
                    </div>
                </td>
                <td>
                    {serviceName}
                    <br />
                        <span className="badge badge-ghost badge-sm">$ {price}</span>
                </td>
                <td><span className='text-orange-500'><strong>{email}</strong></span></td>
                <td>
                {
                  paid ? <span className='text-green-500'><strong>Paid</strong></span> : <span className='text-red-500'><strong>Pending</strong></span>
                }
                </td>
                    {/* <th>
                        <button className="btn btn-ghost btn-xs">details</button>
                    </th> */}
            </tr>
        </>
    );
};

export default AllorderRow;
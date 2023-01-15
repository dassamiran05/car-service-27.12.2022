import React from 'react';
// import { useEffect } from 'react';
// import { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useOrders from '../../hooks/useOrders';
import PageTitle from '../../shared/pageTitle/PageTitle';
import OrderRow from '../orders/OrderRow';

const Userorder = () => {

    const { user } = useContext(AuthContext);
    // const [orderloading, setOrderloading] = useState(false);

    // const [orders, setOrder] = useState([]);


    // useEffect(() => {
    //     function getOrderbyMail(){
    //         setOrderloading(true);
    //         fetch(`https://car-service-server-main.vercel.app/orders?email=${user?.email}`, {
    //             headers:{
    //                 authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    //             }
    //         })
    //         .then(res => res.json())
    //         .then(data => {
    //             setOrder(data);
    //             setOrderloading(false);
    //         });
    //     }

    //     getOrderbyMail();
        
    // }, [user?.email])

    const [orders, setOrder, orderloading] = useOrders(user?.email);



    const handleDelete = id => {
        const proceed = window.confirm('Are you sure want to delete this order');
        if (proceed) {
            fetch(`https://car-service-server-main.vercel.app/orders/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    toast.success('Order deleted successfully');
                    const remaining = orders.filter(odr => odr._id !== id);
                    setOrder(remaining);
                })
        }
    }
    return (
        <>
            <PageTitle title="User order"></PageTitle>
            {/* <PageBannerTitle title="Orders"></PageBannerTitle> */}
            {   
                orderloading ? <p>loading...</p> :
                <div className='my-12'>
                {
                    orders?.length > 0 ?
                        <>
                            <div className="overflow-x-auto w-full">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" />
                                                </label>
                                            </th>
                                            <th>Name</th>
                                            <th>Service name</th>
                                            <th>Favorite Color</th>
                                            <th>Payment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map(order => <OrderRow
                                                key={order._id}
                                                order={order}
                                                handleDelete={handleDelete}
                                            ></OrderRow>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                        :
                        <h3 className='text-5xl'>No data to show</h3>
                }

            </div>
            }
        </>
    );
};

export default Userorder;
import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AllorderRow from './AllorderRow';

const Allorders = () => {

    const [orders, setOrders] = useState([]);
    const [allorderloading, setAllOrderLoading] = useState(false);

    

    useEffect(() => {
        function getAllorderbyadmin(){
            setAllOrderLoading(true);
            fetch('https://car-service-server-main.vercel.app/admin/orders', 
            {
                headers:{
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            }
            )
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setAllOrderLoading(false);
            });
        }
        getAllorderbyadmin();
    }, [])

    const handleOrder = id =>{
        const proceed = window.confirm("Are you sure you want to delete the order");
        if(proceed){
            fetch(`https://car-service-server-main.vercel.app/admin/order/${id}`, {
                method:'DELETE',
                headers:{
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res =>res.json())
            .then(data =>{
                if(data.deletedCount > 0){
                    toast.success('Order deleted successfully');
                    const remaining = orders.filter(or => or._id !== id);
                    setOrders(remaining);
                }
                // console.log(data);
            })
        }
        
    }
    return (
        <>
            {
                allorderloading ? <p>loading...</p> :
                <div className='my-12'>
                    {
                        orders.length > 0 ?
                            <>
                                {/* <h2 className='text-2xl'>You have {orders.length} orders</h2> */}
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
                                                <th>Email</th>
                                                <th>Payment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orders.map(order => <AllorderRow order={order} handleOrder={handleOrder} key={order._id}></AllorderRow>)
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

export default Allorders;
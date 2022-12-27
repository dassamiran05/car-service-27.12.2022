import React, { useContext, useState, useEffect} from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Loading from '../../shared/loading/Loading';
import OrderRow from './OrderRow';

const Orders = () => {

    const { user } = useContext(AuthContext);
    const [orderloading, setOrderloading] = useState(false);

    const [orders, setOrder] = useState([]);

    useEffect(() => {
        function getOrderbyMail(){
            setOrderloading(true);
            fetch(`http://localhost:5000/orders?email=${user?.email}`, {
                headers:{
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            })
            .then(res => res.json())
            .then(data => {
                setOrder(data);
                setOrderloading(false);
            });
        }

        getOrderbyMail();
        
    }, [user?.email])



    const handleDelete = id => {
        const proceed = window.confirm('Are you sure want to delete this order');
        if (proceed) {
            fetch(`http://localhost:5000/orders/${id}`, {
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
                                            <th>Message</th>
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

export default Orders;
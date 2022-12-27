import {useState,useEffect} from 'react';

const useOrders = email => {
    const [orders, setOrder] = useState([]);
    // console.log(email);

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${email}`, {
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            }
        })
        .then(res => res.json())
        .then(data => {
            setOrder(data);
        })
        .catch(err => console.error(err));
    }, [email])

    return [orders, setOrder];
}

export default useOrders;
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import PageTitle from '../../shared/pageTitle/PageTitle';
import PageBannerTitle from '../../shared/PageBannerTitle/PageBannerTitle';
import useOrders from '../../hooks/useOrders';

const Checkout = () => {
    const service = useLoaderData();
    const { _id, title, price } = service;
    const { user } = useContext(AuthContext);

    const initialvalues = {firstName : "", lastName : "", phone : "", message: ""};
    const [formValues, setFormValues] = useState(initialvalues);
    const [formError, setFormError] = useState({});

    const [orders] = useOrders(user?.email);


    const handleChangeInput = (e) =>{
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }


    const handlePlaceOrder = event => {
        event.preventDefault();

        const error = validate(formValues);
        setFormError(error);

        // event.preventDefault();
        // const form = event.target;
        // const name = `${form.firstName.value} ${form.lastName.value}`;
        // const email = user?.email || 'unregistered';
        // const phone = form.phone.value;
        // const message = form.message.value;

        // const order = {
        //     service: _id,
        //     serviceName: title,
        //     price,
        //     customer: name,
        //     phone,
        //     email,
        //     message
        // }

        // if (phone.length < 10) {
        //     toast.error('Please provide a valid number');
        // }
        // else {
            // if(orders.find(order => order.service === _id)){
            //     toast.error('You have already orderd the service');
            // }
            // else{
            //     fetch('http://localhost:5000/orders', {
            //     method: 'POST',
            //     headers: {
            //         'content-type': 'application/json'
            //     },
            //     body: JSON.stringify(order)
            //     })
            //     .then(res => res.json())
            //     .then(data => {
            //         if (data.acknowledged) {
            //             toast.success('Order placed successfuly!');
            //             form.reset();
            //         }

            //     })
            //     .catch(err => toast.error(err));
            // }
            
        // }

        if(Object.keys(error).length === 0 ){
            const name = `${formValues.firstName} ${formValues.lastName}`;
            const email = user?.email || 'unregistered';
            const phone = formValues.phone;
            const message = formValues.message;

            const order = {
                service: _id,
                serviceName: title,
                price,
                customer: name,
                phone,
                email,
                message
            }
            if(orders.find(order => order.service === _id)){
                toast.error('You have already orderd the service');
            }
            else{
                fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(order)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success('Order placed successfuly!');
                        setFormValues(initialvalues);
                    }
    
                })
                .catch(err => toast.error(err));
            }
        }
    }


    const validate = values => {
        const errors = {};
        if(!values.firstName){
            errors.firstName = 'First name is required';
        }
        if(!values.lastName){
            errors.lastName = 'Last name is required';
        }
        if(!values.phone){
            errors.phone = 'Phone is required';
        }else if (values.phone.length !== 10){
            errors.phone = 'Phone number should be 10 digit'; 
        }

        if(!values.message){
            errors.message = "Messgae null"
        }

        return errors;

    }

    return (
        <>
            <PageTitle title="Checkout"></PageTitle>
            <PageBannerTitle title="Checkout" subtitle="Home/Checkout"></PageBannerTitle>
            <div className='my-12'>
                <form onSubmit={handlePlaceOrder} className='p-8' style={{backgroundColor:'#F3F3F3'}}>
                    {/* <h2 className='text-4xl mb-2'>Your are about to order : <span className='font-bold'>{title}</span></h2>
                    <h4 className='text-3xl mb-3'>Price: {price}</h4> */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <input name="firstName" type="text" placeholder="First name" value={formValues.firstName} onChange={handleChangeInput} className="input input-bordered w-full" />
                        { formError.firstName && <p className='text-red-500'>{formError.firstName}</p> }
                        <input name="lastName" type="text" placeholder="Last name" value={formValues.lastName} onChange={handleChangeInput} className="input input-bordered w-full" />
                        { formError.lastName && <p className='text-red-500'>{formError.lastName}</p> }
                        <input name="phone" type="text" placeholder="Your phone" value={formValues.phone} onChange={handleChangeInput} className="input input-bordered w-full" />
                        { formError.phone && <p className='text-red-500'>{formError.phone}</p> }
                        <input name="email" type="text" placeholder="Your email" defaultValue={user?.email} readOnly className="input input-bordered w-full" />
                        
                    </div>
                    <div className='grid grid-cols-1 gap-4 my-4'>
                        <input name="name" type="text" defaultValue={title} readOnly className="input input-bordered w-full" />
                        <textarea name="message" className="textarea textarea-bordered" value={formValues.message} onChange={handleChangeInput} placeholder="Your message"></textarea>
                        <input className='btn border-none' style={{backgroundColor:'#ff3811'}} type="submit" value="Order Confirm" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Checkout;
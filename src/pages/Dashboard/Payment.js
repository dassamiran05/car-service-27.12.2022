import React from 'react';
import { useLoaderData } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51H4St6KHspfP33ih2MIpirS3QtOtMN1Q5KS6xsBKhDCvc73EPxViYq4IX7TAsOHnty2UntoxT6awPHxZ48adXU0v00u3fkuhye');

const Payment = () => {
    const orders = useLoaderData();
    // console.log(orders);
    return (
        <div className='my-12'>
            <h3 className="text-3xl">Payment for <strong>{orders.serviceName}</strong></h3>
            <p className='text-3xl'>Please pay : <strong>${orders.price}</strong></p>
            <div className='w-96 my-6'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm orders={orders} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
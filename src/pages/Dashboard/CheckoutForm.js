import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import toast from 'react-hot-toast';

const CheckoutForm = ({orders}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("");
    const [success, setSuccess] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const {_id, price, customer, email} = orders;


    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://car-service-server-main.vercel.app/create-payment-intent", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json" ,
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
          body: JSON.stringify({price}),
        })
          .then((res) => res.json())
          .then((data) => {
            setClientSecret(data.clientSecret);
          });
      }, [price]);
    

    const handleSubmit = async (event) => {

        event.preventDefault();
        if(!stripe || !elements){
            return ;
        }


        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
  
        if (error) {
            console.log(error);
            setCardError(error.message);
        } else {
            setCardError('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        setSuccess('');
        setProcessing(true);
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: customer,
                  email: email
                },
              },
            },
          );

          if(confirmError){
            setCardError(confirmError.message);
            return ;
          }

          if(paymentIntent.status === "succeeded"){

            const payment ={
              price,
              transactionId: paymentIntent.id,
              email,
              orderId: _id
            };

            //set payment data to database from client site
            fetch("https://car-service-server-main.vercel.app/payments", {
              method: "POST",
              headers: { 
                "Content-Type": "application/json" ,
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
              body: JSON.stringify(payment),
            })
              .then((res) => res.json())
              .then(data => {
                if(data.insertedId){
                  setTransactionId(paymentIntent.id);
                  setSuccess('Congrat! payment done succesfully');
                }
              });

          }
          setProcessing(false);
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                options={{
                    style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                        color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                    },
                }}
                />
                <button type="submit" className='btn btn-primary mt-5'  disabled={!stripe || !clientSecret || processing}>
                  { processing ? 'Processing' : `Pay ${price}`}
                </button>
                
            </form>
            <p className="text-red-500">{cardError}</p>
            {
              success && <div>
                <p className="text-3xl text-green-600">{success}</p>
                <p className="text-3xl">Your transaction id is: {transactionId}</p>
              </div>
            }
        </>
    );
};

export default CheckoutForm;
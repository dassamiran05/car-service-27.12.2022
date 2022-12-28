import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import MyBackgroundImage from '../../assets/images/banner/2.jpg';



const Contactus = () => {

    const [formData, setFormdata] = useState({});

    // const [sent, setSent] = useState(false);
    const handleinputdetails = e => {
        setFormdata({...formData, [e.target.name] : e.target.value});
    }

    const handleSubmitDetails = (event) => {
        event.preventDefault();
        // try{
        //     setSent(true);
            fetch('http://localhost:5000/send_mail', {
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(formData)   
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success("Email has been sent");
                event.target.reset();
            });
        // }
        // catch(error){
        //     console.log(error);
        // }
    }
    return (
        <>
            
            <div className='w-full h-96 pl-8 flex items-center relative rounded mb-24 mt-8 banner-sec' style={{backgroundImage:`url(${MyBackgroundImage})`}}>
                <h3 className='text-5xl text-white font-bold'>Contact us</h3>
                <div className='angle'><p>Home/Service Detail</p></div>
            </div>
                <div className='my-20'>
                    <div className='text-center'>
                        <p className='text-2xl font-bold text-orange-600 leading-7'>Get in Touch</p>
                        <h2 className='text-5xl font-bold'>Contact us for more info</h2>
                        <p className='w-1/2 mx-auto leading-7 my-5'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                    </div>
                    <div className='w-3/4 mx-auto'> 
                        {/* {
                            !sent ?  */}
                            <form className='p-8' style={{backgroundColor:'#F3F3F3'}} onSubmit={handleSubmitDetails}>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                    <input name="name" type="text" placeholder="Your name" value={formData.name || ''} onChange={handleinputdetails} className="input input-bordered w-full" />
                                    <input name="phone" type="number" placeholder="Contact number" value={formData.phone || ''} onChange={handleinputdetails} className="input input-bordered w-full" />
                                </div>
                                <div className='grid grid-cols-1 gap-4 my-4'>
                                    <input name="subject" type="text" placeholder="Your subject" value={formData.subject || ''} onChange={handleinputdetails} className="input input-bordered w-full" />
                                    
                                    <input name="email" type="email" placeholder="Your email" value={formData.email || ''} onChange={handleinputdetails} className="input input-bordered w-full" />
                                    <textarea name="description" className="textarea textarea-bordered" onChange={handleinputdetails} value={formData.description || ''} placeholder="Your messages" required></textarea>
                                    <input className='btn border-none' style={{backgroundColor:'#ff3811'}} type="submit" value="Send" />
                                </div>
                            </form>
                            {/* :
                            <div className='w-1/2 mx-auto p-8 flex items-center justify-center' style={{backgroundColor:'#F3F3F3'}}><h1 className="text-3xl">Email has beent sent</h1></div>
                        } */}
                    </div>
                </div> 
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.21192705746!2d88.27731165151606!3d22.535570756362414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1672210531371!5m2!1sen!2sin" width="100%" height="450" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title='map'></iframe>
            </div>
        </>
    );
};

export default Contactus;
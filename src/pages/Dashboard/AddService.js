import React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import MyBackgroundImage from '../../assets/images/banner/2.jpg';

const AddService = () => {
    const [currentImage, setCurrentImage] = useState('');
    const navigate = useNavigate();

    const imageHostkey = process.env.REACT_APP_imgbb_key;


    const handleimage = e =>{
        const image = e.target.files[0];
        setCurrentImage(image);
    }

    const handleAddService = (event) => {
        event.preventDefault();
        const form = event.target;
        const servicename = form.servicename.value;
        const price = form.price.value;
        const description = form.description.value;
        const formData = new FormData();
        formData.append('image', currentImage);

        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostkey}`;

        fetch(url, {
            method:'POST',
            body:formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                const imgUrl = imgData.data.url;
                const service = {
                    title : servicename,
                    price : price,
                    description : description,
                    img : imgUrl 
                }

                // save  service to database

                fetch('http://localhost:5000/services', {
                    method:'POST',
                    headers:{
                        'content-type': 'application/json',
                        authorization:`Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body:JSON.stringify(service)
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    if(result.acknowledged){
                        toast.success('Service added successfully');
                        navigate('/dashboard/manageservices');
                    }
                })

            }
        })
        
    }
    return (
        <>
            {/* <div className='w-full h-96 pl-8 flex items-center relative rounded mb-24 mt-8 banner-sec' style={{backgroundImage:`url(${MyBackgroundImage})`}}>
                    <h3 className='text-5xl text-white font-bold'>Add Service</h3>
                    <div className='angle'><p>Home/Addservice</p></div>
            </div> */}
            <div className='my-12'>
                <form onSubmit={handleAddService} className='p-8' style={{backgroundColor:'#F3F3F3'}}>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                        <input name="servicename" type="text" placeholder="Service Name" className="input input-bordered w-full" />
                        <input name="file" type="file" onChange={handleimage} className="input input-bordered w-full"/>
                    </div>
                    <div className='grid grid-cols-1 gap-4 my-4'>
                        
                        <input name="price" type="number" placeholder="Price" className="input input-bordered w-full" />
                        <textarea name="description" className="textarea textarea-bordered" placeholder="Service Description" required></textarea>
                        <input className='btn border-none' style={{backgroundColor:'#ff3811'}} type="submit" value="Add Service" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddService;
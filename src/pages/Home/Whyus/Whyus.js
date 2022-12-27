import React from 'react';
import expert from '../../../assets/icons/group.svg';
import person from '../../../assets/icons/person.svg';
import wrench from '../../../assets/icons/Wrench.svg';
import delivery from '../../../assets/icons/deliveryt.svg';
import check from '../../../assets/icons/check.svg';


const Whyus = () => {
    return (
        <div className='my-20'>
        <div className='text-center'>
            <p className='text-2xl font-bold text-orange-600 leading-7'>Core Features</p>
            <h2 className='text-5xl font-bold'>Why Choose Us</h2>
            <p className='w-1/2 mx-auto leading-7 my-5'>The majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
        </div>
        <div className='flex justify-between items-center mt-16'>
            <div style={{borderWidth:'1px', borderColor:'#f3f3f3',padding:'30px', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <img src={expert} alt='' className='mb-3'/>
                <p className='text-xl font-bold not-italic'>Expert Team</p>
            </div>
            <div style={{borderWidth:'1px', borderColor:'#f3f3f3',padding:'30px', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <img src={person} alt='' className='mb-3'/>
                <p className='text-xl font-bold not-italic'>Timely Delivery</p>
            </div>
            <div style={{borderWidth:'1px', borderColor:'#f3f3f3',padding:'30px', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <img src={wrench} alt='' className='mb-3'/>
                <p className='text-xl font-bold not-italic'>24/7 Support</p>
            </div>
            <div style={{borderWidth:'1px', borderColor:'#f3f3f3',padding:'30px', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <img src={delivery} alt='' className='mb-3'/>
                <p className='text-xl font-bold not-italic'>Best Equipment</p>
            </div>
            <div style={{borderWidth:'1px', borderColor:'#f3f3f3',padding:'30px', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <img src={check} alt='' className='mb-3'/>
                <p className='text-xl font-bold not-italic'>100% Gurantee</p>
            </div>
            <div style={{borderWidth:'1px', borderColor:'#f3f3f3',padding:'30px', display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <img src={expert} alt='' className='mb-3'/>
                <p className='text-xl font-bold not-italic'>Good Quality</p>
            </div>

        </div>
    </div>
    );
};

export default Whyus;
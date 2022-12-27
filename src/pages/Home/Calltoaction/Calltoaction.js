import React from 'react';
import clock from '../../../assets/images/conIcons/clock.png';
import chat from '../../../assets/images/conIcons/chat.png';
import map from '../../../assets/images/conIcons/map.png';
import './Calltoaction.css';

const Calltoaction = () => {
    return (
        <div className='my-20 p-16 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-between items-center bg-[#151515] rounded-xl'>
            <div className='flex items-center lg:mb-0 md:mb-16 sm:mb-16 contact'>
                <img src={clock} alt='' className='mr-5'/>
                <div>
                    <p className='text-white text-sm'>We are open monday-friday</p>
                    <p className='text-white text-2xl'>7:00 am - 9:00 pm</p>
                </div>
            </div>
            <div className='flex items-center lg:mb-0 md:mb-16 sm:mb-16 contact'>
                <img src={chat} alt='' className='mr-5'/>
                <div>
                    <p className='text-white text-sm'>Have a question?</p>
                    <p className='text-white text-2xl'>+2546 251 2658</p>
                </div>
            </div>
            <div className='flex items-center lg:mb-0 md:mb-16 sm:mb-16'>
                <img src={map} alt='' className='mr-5'/>
                <div>
                    <p className='text-white text-sm'>Need a repair? our address</p>
                    <p className='text-white text-2xl'>Liza Street, New York</p>
                </div>
            </div>
        </div>
    );
};

export default Calltoaction;
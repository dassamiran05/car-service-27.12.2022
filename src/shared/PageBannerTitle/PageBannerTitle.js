import React from 'react';
import MyBackgroundImage from '../../assets/images/banner/2.jpg';

const PageBannerTitle = ({title, subtitle}) => {
    
    return (
        <div className='w-full h-96 pl-8 flex items-center relative rounded mb-24 mt-8 banner-sec' style={{backgroundImage:`url(${MyBackgroundImage})`}}>
            <h3 className='text-5xl text-white font-bold'>{title}</h3>
            { subtitle && <div className='angle'><p>{subtitle}</p></div> }
        </div>
    );
};

export default PageBannerTitle;
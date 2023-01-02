import React from 'react';
import { Link } from 'react-router-dom';
import './BannerItem.css';



const BannerItem = ({slide}) => {
    const {id, prev, next, image} = slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='carousel-img'>
                <img src={image} className="w-full rounded-lg" alt=''/>
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/3 banhead">
                <h1 className='text-6xl font-bold text-white'>
                    Affordable <br />
                    Price for Car <br />
                    Servicing
                </h1>
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 w-2/5 left-24 md:top-2/3  bantext" style={{top:'52%'}}>
                <p className='text-xl text-white'>There are many variations of passages of available, but the majority have suffered alteration in some form</p>
            </div>
            <div className="absolute flex justify-start transform -translate-y-1/2 w-2/5 left-24 banbutton" style={{bottom:"33%"}}>
                <Link to='/about'><button className="btn btn-warning mr-5" style={{backgroundColor:'#ff3811',color:'#fff', border:'none'}}>Discover more</button></Link>
                {/* <Link to='/#services'><button className="btn btn-outline btn-warning">View Services</button></Link> */}
            </div>
            <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle" style={{backgroundColor:'#ff3811',color:'#fff'}}>❯</a>
            </div>
        </div>
    );
};

export default BannerItem;
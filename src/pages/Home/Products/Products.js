import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Product from '../Product/Product';

const Products = () => {
    const [products, setProducts] = useState([]);
    // console.log(products);

    useEffect(() => {
        // fetch('products.json').then(res => res.json()).then(data => setProducts(data));
        fetch('http://localhost:5000/products').then(res => res.json()).then(data => setProducts(data));
    }, []);
    return (
        <div className='my-20'>
            <div className='text-center'>
                <p className='text-2xl font-bold text-orange-600 leading-7'>Popular Products</p>
                <h2 className='text-5xl font-bold'>Browse Our Products</h2>
                <p className='w-1/2 mx-auto leading-7 my-5'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:mx-auto'>
                
                {
                    products.map(product => <Product
                    key = {product._id}
                    product = {product}
                    ></Product>)
                }
            </div>
            <div className='my-5 text-center'>
                <Link to="#"><button className="btn btn-outline btn-warning">More Products</button></Link>
            </div>
        </div>
    );
};

export default Products;
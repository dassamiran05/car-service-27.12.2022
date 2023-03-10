import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
// import useToken from '../../hooks/useToken';

const Header = () => {
    const { user, signOutUser ,globalToken} = useContext(AuthContext);
    // console.log(user);
    const [userdetail, setUserDetail] = useState({});
    // const [token] = useToken(user?.email);


    useEffect(() => {
        if(user?.email){

            fetch(`https://car-service-server-main.vercel.app/username?email=${user?.email}`, {
                headers:{
                    authorization:`Bearer ${globalToken}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setUserDetail(data);
            });
        }
    }, [user?.email, globalToken])


    const handleSignoutUser = () => {
        signOutUser()
        .then(res => {
            setUserDetail({});
        })
        .catch(error => console.error(error));
    }


    

    const menuItems = <>
        <li className='font-semibold'><Link to="/">Home</Link></li>
        <li className='font-semibold'><Link to="/about">About us</Link></li>
        {
            user?.email && <>
                <li className='font-semibold'><Link to="/dashboard">Dashboard</Link></li>
                <li className='font-semibold'><Link to="/orders">Orders</Link></li>
            </>
        }
        <li className='font-semibold'><Link to="/contact">Contact us</Link></li>

    </>

    

    return (
        <div className="navbar h-20 pt-12 mb-12 bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {/* <li><a>Item 1</a></li>
                        <li tabIndex={0}>
                            <a className="justify-between">
                                Parent
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                            </a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li> */}
                        {menuItems}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">
                    <img src={logo} alt="" className='w-24' />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.email ?
                        <>  
                            { userdetail?.name && 
                                <>
                                    <div className='flex flex-col text-right'>
                                        <span style={{color:'#ff3811'}} className='text-xl'>{userdetail?.name}</span>
                                    </div>
                                </>
                            }
                            
                            <button variant="link" className="btn btn-ghost" onClick={handleSignoutUser}>Sign out</button>
                        </>
                        :
                        <>
                            <li className='font-semibold mr-8' style={{listStyle:'none'}}><Link to="/login">Login</Link></li>
                            <li className='font-semibold' style={{listStyle:'none'}}><Link to="/signup">Sign Up</Link></li>
                        </>
                }
                <label htmlFor="dashboard-drawer" tabIndex={2} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Header;
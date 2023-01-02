import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Header from '../shared/Header/Header';

const DashboardLayout = () => {

    const {user} =useContext(AuthContext);
    const [isAdmin]= useAdmin(user?.email);
    return (
        <div>
            <Header></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>                
                </div> 
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        
                        <li><Link to='/dashboard'>ABCD</Link></li>
                        <li><Link to='/dashboard/userorder'>User orders</Link></li>
                        
                        {
                            isAdmin && <>
                                <li><Link to='/dashboard/allorder'>All Orders</Link></li>
                                <li><Link to='/dashboard/allusers'>All Users</Link></li>
                                <li><Link to='/dashboard/addservice'>Add Service</Link></li>
                                <li><Link to='/dashboard/manageservices'>Manage Services</Link></li>
                            </> 
                        }        
                        {/* <li><Link to='/orders'>Orders</Link></li> */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
import React, {  useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Allusers = () => {

    const [users, setUsers] = useState([]);    

    useEffect(() => {
        const url = 'https://car-service-server-main.vercel.app/users';
        fetch(url, {
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            }
        })
        .then(res => res.json())
        .then(data =>{
            setUsers(data);
        })
    }, []);

    const handleMakeAdmin = id =>{
        fetch(`https://car-service-server-main.vercel.app/users/admin/${id}`, {
            method:'PUT',
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            }
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.modifiedCount > 0){
                toast.success('Made admin Successfully');
            }
            
        })
    }

    const handleDeleteUser = (id, name) => {
        const proceed = window.confirm(`Are you sure you want to delete the user ${name}`);
        if(proceed){
            fetch(`https://car-service-server-main.vercel.app/users/admin/${id}`, {
            method:'DELETE',
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            }
            })
            .then(res => res.json())
            .then(data =>{
                if(data.deletedCount > 0){
                    console.log(data);
                    toast.success(`User ${name} Deleted succesfully`);
                    const remaing = users.filter(u => u._id !== id);
                    setUsers(remaing);
                }
                
            })
        }
    }
    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Admin</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    users?.map((user, i) => {
                        return (
                            <tr key={user._id}>
                                <th>{i+1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                { 
                                  user.role === 'admin' ? <td><span className="badge badge-accent">Admin</span></td> : <td><span className="badge badge-primary">Normal User</span></td>
                                }
                                <td>
                                    {
                                        user?.role !== 'admin' && <button className='btn' onClick={() => handleMakeAdmin(user._id)}>Make admin</button>
                                    }
                                </td>
                                <td>
                                    <button className="btn btn-square btn-error" onClick={() =>handleDeleteUser(user._id, user.name)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

export default Allusers;
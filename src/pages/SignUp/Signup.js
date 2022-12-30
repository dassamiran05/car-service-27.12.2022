import React, { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';
import PageTitle from '../../shared/pageTitle/PageTitle';

const Signup = () => {
    const {createUser} = useContext(AuthContext);

    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);

    const navigate = useNavigate();

    if(token){
        navigate('/');
    }

    const handleSignup =event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;

        if (password.length < 6) {
            toast.error('Password should be minimum 6 digits');
        }
        else{
            createUser(email, password)
            .then(res =>{
            const user = res.user;
            toast.success('User created successfully');
            saveUser(name, email);
            console.log(user);
            })
            .catch(err => console.error(err));
        }    
    }

    const saveUser = (name, email) =>{
        const user = {name, email};
        const url = 'http://localhost:5000/users';
        fetch(url,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged){
                // getUserToken(email);
                setCreatedUserEmail(email);
            }
            
        })
    }

    // const getUserToken = email =>{
    //     fetch(`http://localhost:5000/jwt?email=${email}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         if(data.accessToken){
    //             localStorage.setItem('accessToken', data.accessToken);
    //             navigate('/');
    //         }
    //     })
    // }
    return (
        <>
            <PageTitle title="Signup"></PageTitle>
            <div className="hero w-full my-24">
                <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <img className='w-3/4' src={img} alt=''/>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 pb-16 pt-12">
                        <h1 className="text-5xl text-center font-bold">Sign up</h1>
                        <form onSubmit={handleSignup} className="card-body">
                        <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Your name" className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name="email" placeholder="email" className="input input-bordered" required/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required/>
                            </div>
                            <div className="form-control mt-6">
                                <input type='submit' value='Sign up' className="btn btn-primary"/>
                            </div>
                        </form>
                        <p className='text-center'>Already have an account <Link to='/login' className='font-bold text-orange-500'> Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
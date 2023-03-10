import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken';
// import Loading from '../../shared/loading/Loading';
import PageTitle from '../../shared/pageTitle/PageTitle';
import './login.css';

const Login = () => {
    const {signInUser, loading, setLoading, signOutUser, setGlobalToken} = useContext(AuthContext);
    const [loginUserEmail, setloginuserEmail] = useState('');
    const [token] = useToken(loginUserEmail);
    const [logerror, setLogerror] = useState('');
    const [show, setShow] = useState(false);
    

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';


    useEffect(() => {
        if(token){
            setGlobalToken(token);
            navigate(from, { replace: true });    
        }
    }, [token, from, navigate, setGlobalToken]);
    
    

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        
        signInUser(email, password)
        .then(res =>{
            const user = res.user;
            console.log(user);
            if(user.emailVerified){
                setloginuserEmail(email); 
            }
            else{
                signOutUser()
                .then(res => {
                    // setUserDetail({});
                })
                .catch(error => console.error(error));
                toast.error('Email is not verified');
            }
             
        })
        .catch(error => {
            // console.error(error.message);
            setLogerror(error.message);
        })
        .finally(() => {
            setLoading(false);
        })
    }
    
    

        // if(loading){
        //     return <Loading></Loading>;
        // }

        const handleShow = () => {
            setShow(!show);
        }

    return (
        <>
            <PageTitle title="Login"></PageTitle>
            <div className="hero w-full my-24">
                <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                        <img className='w-3/4' src={img} alt=''/>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 pb-16 pt-12">
                        <h1 className="text-5xl text-center font-bold">Login</h1>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name="email" placeholder="email" className="input input-bordered" required/>
                            </div>
                            <div className="form-control showform">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={show ? "text" : "password"} name="password" placeholder="password" className="input input-bordered" required/>
                                <span onClick={handleShow} className="showbtn">{show ? 'Hide' : 'Show'}</span>
                                
                                <label className="label">
                                    <Link to="#" className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type='submit' value='Login' disabled={loading} className="btn btn-primary"/>
                            </div>
                            {logerror && <p className='text-red-500'>{logerror}</p>}
                        </form>
                        <p className='text-center'>New to genius car <Link to='/signup' className='font-bold text-orange-500'> Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
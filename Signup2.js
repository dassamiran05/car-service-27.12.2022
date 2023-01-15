import React, { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
// import useToken from '../../hooks/useToken';
import PageTitle from '../../shared/pageTitle/PageTitle';

const Signup = () => {
    const {createUser} = useContext(AuthContext);
    const initialvalues = {name : "", email : "", password : ""};
    const [formValues, setFormValues] = useState(initialvalues);
    const [formError, setFormError] = useState({});
    // const [createdUserEmail, setCreatedUserEmail] = useState('');
    // const [token] = useToken(createdUserEmail);
    // console.log(formError);
    // console.log(Object.keys(formError).length);

    // const navigate = useNavigate();

    // if(token){
    //     navigate('/');
    // }


    

    const handleChangeInput = (e) =>{
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value});
    }


    const handleSignup = event =>{
        event.preventDefault();
        const error = validate(formValues);
        setFormError(error);

    

        if(Object.keys(formError).length === 0 && ((!formValues.email) && (!formValues.password) && (!formValues.name))){
            const userEmail = formValues.email;
            const userPass = formValues.password;
            const userName = formValues.name;

            fetch(`https://car-service-server-main.vercel.app/checkuser?email=${userEmail}`)
            .then(res => res.json())
            .then(data => {
                if(data.alreadyExists){
                    toast.error('User already exists in the database');
                    setFormValues(initialvalues);
                }
            });

            createUser(userEmail, userPass)
            .then(res =>
            {
                const user = res.user;
                toast.success('User created successfully');
                saveUser(userName, userEmail);
                console.log(user);
            })
            .catch(err => console.error(err));

            
        }
        
        
        // const form = event.target;
        // const email = form.email.value;
        // const password = form.password.value;
        // const name = form.name.value;

        // if (password.length < 6) {
        //     toast.error('Password should be minimum 6 digits');
        // }
        // else{
        //     createUser(email, password)
        //     .then(res =>{
        //     const user = res.user;
        //     toast.success('User created successfully');
        //     saveUser(name, email);
        //     console.log(user);
        //     })
        //     .catch(err => console.error(err));
        // }    
    }


    const validate = values => {
        const errors = {};
        const regex =  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if(!values.name){
            errors.name = 'Name is required';
        }
        if(!values.email){
            errors.email = 'Email is required';
        }else if(!regex.test(values.email)){
            errors.email = 'This is not a valid email'; 
        }
        if(!values.password){
            errors.password = 'Password is required';
        }else if (values.password.length < 6){
            errors.password = 'Minimum password length is 6'; 
        }else if (values.password.length > 10){
            errors.password = 'Maximum password length is 10'; 
        }

        return errors;

    }

    const saveUser = (name, email) =>{
        const user = {name, email};
        const url = 'https://car-service-server-main.vercel.app/users';
        fetch(url,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            // if(data.acknowledged){
            //     getUserToken(email);
            //     setCreatedUserEmail(email);
            // }
            
        })
    }

    // const getUserToken = email =>{
    //     fetch(`https://car-service-server-main.vercel.app/jwt?email=${email}`)
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
                                <input type="text" name="name" placeholder="Your name" className="input input-bordered" value={formValues.name} onChange={handleChangeInput}/>
                                <p className='text-red-500'>{formError.name}</p>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name="email" placeholder="email" className="input input-bordered" value={formValues.email} onChange={handleChangeInput}/>
                                <p className='text-red-500'>{formError.email}</p>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" value={formValues.password} onChange={handleChangeInput}/>
                                <p className='text-red-500'>{formError.password}</p>
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
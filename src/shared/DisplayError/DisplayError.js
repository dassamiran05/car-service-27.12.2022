import React from 'react';
import { useContext } from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const {signOutUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignoutUser = () => {
        signOutUser()
        .then(res => navigate('/'))
        .catch(error => console.error(error));
    }
    return (
        <div>
            <p className='text-red-500'>Something went wrong!!!</p>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <h4 className="text-3xl">Please <button className="btn btn-ghost" onClick={handleSignoutUser}>Sign out</button> and log back in</h4>
        </div>
    );
};

export default DisplayError;
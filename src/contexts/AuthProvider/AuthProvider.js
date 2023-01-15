import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";


export const AuthContext = createContext();

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalToken, setGlobalToken] = useState('');    

      // useEffect(() => {

      //   const handleRefreshToken = () => {
      //     fetch(`https://car-service-server-main.vercel.app/check-token-expiration`, {
      //       'content-type':'application/json',
      //       headers: {
      //         authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      //       },
      //     })
      //       .then(res => res.json())
      //       .then(data => {
      //         console.log(data);
      //         if(data.status === 403 && data.message === 'Token expired'){
      //           localStorage.removeItem('accessToken');
      //         }
      //       })
      //   }

      //   handleRefreshToken();
      // }, [])

      

    const varifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);

    }

    const signOutUser = () =>{
        setLoading(true);
        localStorage.removeItem('accessToken');
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if(currentUser === null || currentUser.emailVerified){
                setUser(currentUser);
            }
            setLoading(false);
            })

            return () => {
                return unsubscribe();
            }
        }, []);


    const authInfo = { user, loading, createUser, signInUser, signOutUser, setLoading ,varifyEmail, globalToken, setGlobalToken }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
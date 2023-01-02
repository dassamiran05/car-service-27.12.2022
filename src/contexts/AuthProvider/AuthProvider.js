import React, { createContext, useEffect, useState } from 'react';
import app from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


export const AuthContext = createContext();

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })

        return () => {
            return unsubscribe();
        }
    }, []);

    

      // useEffect(() => {

      //   const handleRefreshToken = () => {
      //     fetch(`http://localhost:5000/check-token-expiration`, {
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
        return signOut(auth);
    }
    const authInfo = { user, loading, createUser, signInUser, signOutUser, setLoading }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
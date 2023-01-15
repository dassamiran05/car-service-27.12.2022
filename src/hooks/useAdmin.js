import {useState, useEffect} from 'react';

const useAdmin = email =>{
    const [isAdmin, setIsadmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        if(email){
            fetch(`https://car-service-server-main.vercel.app/users/admin/${email}`)
            .then(res => res.json())
            .then(data =>{
                // console.log(data);
                setIsadmin(data.isAdmin);
                setIsAdminLoading(false);
            })
        }
    }, [email]);

    return [isAdmin, isAdminLoading];
}

export default useAdmin;
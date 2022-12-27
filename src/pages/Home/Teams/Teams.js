import React, { useEffect, useState } from 'react';
import Team from './Team';

const Teams = () => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        fetch('team.json').then(res => res.json()).then(data => setTeam(data));
    }, [])
    return (
        <div className='my-20'>
            <div className='text-center'>
                <p className='text-2xl font-bold text-orange-600 leading-7'>Team</p>
                <h2 className='text-5xl font-bold'>Meet Our Team</h2>
                <p className='w-1/2 mx-auto leading-7 my-5'>The majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6  sm:mx-auto'>
                {
                    team.map(t => <Team
                    key={t.id}
                    t={t}
                    ></Team>)
                }

            </div>
        </div>
    );
};

export default Teams;
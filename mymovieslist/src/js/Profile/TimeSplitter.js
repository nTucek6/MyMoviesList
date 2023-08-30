import React from 'react';

export default function TimeSplitter({ TimeSpentWatching }) {
    const hours = Math.floor(TimeSpentWatching);
    const minutes = Math.round((TimeSpentWatching - hours) * 60);

    if(minutes === 0)
    {
      return  <span>Hours: {hours}</span>;
        
    }
    else
    {
        return <span>{hours} h : {minutes} m</span>
    }
}


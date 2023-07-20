import React, { useState, useEffect } from 'react';

const VideoCallTimer = () => {
    const [totalSeconds, setTotalSeconds] = useState(0);

    useEffect(() => {
        let interval;
        interval = setInterval(() => {
            setTotalSeconds(prevTotalSeconds => prevTotalSeconds + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return (
        <span className='call-duration'>
            { (hours !== 0 ? String(hours).padStart(2, '0') + ':' :'') + String(minutes).padStart(2, '0') }
        </span>
    );
};

export default VideoCallTimer;

//String(seconds).padStart(2, '0')







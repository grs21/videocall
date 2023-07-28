import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const VideoCallTimer = () => {
    const [totalSeconds, setTotalSeconds] = useState(0);
    const { timerStarted } = useSelector(state => state.componentState);
    let intervalIdRef = React.useRef(null);
    useEffect(() => {
        if (timerStarted) {
            intervalIdRef.current = setInterval(() => {
                setTotalSeconds(prevTotalSeconds => prevTotalSeconds + 1);

            }, 1000);
        } else {
            // Timer durdurulduğunda interval'ı temizle
            clearInterval(intervalIdRef.current);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        };
    }, [timerStarted]);

    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return (
        <span className='call-duration'>
            {(hours !== 0 ? String(hours).padStart(2, '0') + ':' : '') + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0')}
        </span>
    );
};

export default VideoCallTimer;

//String(seconds).padStart(2, '0')
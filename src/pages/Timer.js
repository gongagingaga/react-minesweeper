import React, { useEffect } from 'react';

function Timer({ timer, isActive, setIsActive, updateTimer}) {

    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                updateTimer(prevTimer => prevTimer + 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isActive]);


    return (
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{ fontSize: '5em' }}> {timer}</div>
        </div>
    );
}

export default Timer;

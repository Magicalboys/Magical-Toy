import React from 'react';
import {useRef, useState} from 'react';

export const Timer = () => {
    const [time, setTime] = useState(0);
    const timer = useRef<any>();
    const stop = () => {
        clearInterval(timer.current);
    };

    const start = () => {
        if (time <= 60) {
            timer.current = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        }
    };

    return (
        <div className="App">
            <button onClick={()=>start()}>开始</button>
            <button onClick={()=>stop()}>暂停</button>
            <div>
                {
                    time
                }
            </div>
        </div>
    );
};

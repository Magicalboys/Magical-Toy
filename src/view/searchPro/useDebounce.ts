import {useEffect, useRef, useState} from 'react';

export const useDebounce = (value:string,delay:number) => {
    const timer = useRef<any>();
    const [debounceValue,setDebounceValue] = useState('');

    useEffect(()=> {
        timer.current = setTimeout(()=>{
            setDebounceValue(value);
        });
        return () => {
            clearTimeout(timer.current);
        };
    },[value,delay]);

    return debounceValue;
};
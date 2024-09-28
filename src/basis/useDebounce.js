
const useDebounce = (fn,time) => {
    const timer = useRef();
    useEffect(()=>{
        if (time.current){
            clearTimeout(time.current)
            timer.current = null;
        }
        timer.current = setTimeout(()=>{
            fn()
        },time)
        return timer.current;
    },[])
}
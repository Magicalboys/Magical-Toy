const debounce = (fn,time) => {
    let timer = null;
    return function(...arg){
        if (timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            fn.apply(...arg)
        },time)
    }
};

const throttle = (fn,time) => {
    let flag = true;
    return function(...arg){
        if (flag){
            flag = false;
            setInterval(()=>{
                flag = true;
                fn.apply(this,arg);
            },time)
        }
    }
}
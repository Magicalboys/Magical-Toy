const throttle = (fn,time) => {
    let timer = null , flag = true;
    return function (...arg){
        if (!flag){
            return;
        }
        flag = false;
        timer = setTimeout(()=>{
            fn.apply(this,...arg)
            flag = true;
            timer = null
            clearTimeout(timer);
        },time)
    }
}
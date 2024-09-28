const throttle = function(fn,time){
    let flag = true , timer = null;
    return function (...arg){
        if (!flag) return;
        flag = false;
        timer = setTimeout(() => {
            fn(arg)
            flag = true;
            clearTimeout(timer);
            timer = null;
        },time)
    }
};

const throttle_ = (fn,time) => {
    let flag = false , timer = null;
    return function (...arg){
        if (flag)return;
        flag = true;
        timer = setTimeout(()=>{
            fn.call(this,arg);
            flag = false;
            clearTimeout(timer)
        },time)
    }
}
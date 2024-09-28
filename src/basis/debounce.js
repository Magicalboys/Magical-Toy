// const debounce = (fn,time) => {
//     let timer = null;
//     return function(...arg){
//         if (timer){
//             clearTimeout(timer);
//         }
//         timer = setTimeout(()=>{
//             fn.apply(...arg);
//         },time);
//     };
// };

// const throttle = (fn,time) => {
//     let flag = true;
//     return function(...arg){
//         if (flag){
//             flag = false;
//             setTimeout(()=>{
//                 flag = true;
//                 fn.apply(this,arg);
//             },time);
//         }
//     };
// };

const debounce = (fn,time)=> {
    let timer = null;
    return function (...arg) {
        if (timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() =>{
            fn.call(this,...arg);
            timer = null;
        },time);
    };
};

// 节流：一个时间段内，只有一次能触发回调函数的执行
const throttle = (fn,time) => {
    let flag = false;
    return function(...arg){
        if(flag)return;
        let timer = setTimeout(()=>{
            flag = true;
            fn.call(this,...arg);
            clearTimeout(timer);
            timer = null;
        },time);
    };
};
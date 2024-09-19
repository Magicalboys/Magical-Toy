// 写一个高阶函数，第一个参数传递一个函数，第二个参数传递执行的次数，第三个参数传递时间间隔，
// 要求它返回一个新的函数，调用新函数时，它每个时间间隔执行对应的参数函数，执行一定次数后结束。


const fun = (fn,cout,time) => {

    const sleep = (fn,time) => {
        return new Promise((resolve)=>{
            setTimeout(()=>{
                fn();
                resolve();
            },time);
        });
    };

    return async function(){
        while(cout --){
            await sleep(fn,time);
        }
    };
};

let i = 0 ;
const dfs = () => {console.log(i ++);};

const run = fun(dfs,5,2000);

run();
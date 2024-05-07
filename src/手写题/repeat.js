// 实现一个函数，重复执行某函数，每次间隔2秒
const repeat = async (fun,times,delay) => {
    const sleep = (fun)=> {
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve()
                fun(...arg)
            },delay * 1000)
        })
    }
     for(let i = 0;i < times;i++) {
        await sleep(fun)
    }
}

const fun = (arg) => {
    console.log(arg)
}

repeat(fun,5,2)
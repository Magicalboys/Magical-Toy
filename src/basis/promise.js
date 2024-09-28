// Promise.prototype.Myall = (promises) => {
//     let cnt = 0 , ans = [];
//     return new Promise((resolve,reject)=>{
//         promises.forEach((item,i)=>{
//             Promise.resolve(item)
//             .then(res =>{
//                 cnt ++;
//                 ans[i] = res;
//                 if( cnt === promises.length){
//                     resolve(ans);
//                 }
//             })
//             .catch(reject)
//         })
//     })
// }

Promise.myRace = (promises) =>{
    return new Promise((resolve,reject) => {
        for (let promise of promises){
            Promise.resolve(promise).then(resolve,reject);
        }
    });
}; 



// 如果有一个 promise 对 就是 对 
Promise.prototype.MyAny = (promises) => {
    let cnt = 0 , ans = [];
    return new Promise ((resolve,reject)=>{
        promises.forEach((item,i) => {
            Promise.resolve(item)
                .then(resolve)
                .catch(res => {
                    cnt ++;
                    ans[i] = res;
                    if (cnt === promises.length){
                        reject(new Error('没有 promise 成功'));
                    }
                });
        });
    });
};

Promise.prototype.retry = async (fn,time) => {
    let ans;
    while(time --){
        await new Promise((resolve,reject) => {
            fn()
                .then(res => {
                // 成功就终止循环
                    time = 0;
                    ans = res;
                    resolve();
                })
                .catch(err => {
                    time == 0 ? reject(err) : resolve();
                });
        });
    }
    return ans;
};

const sleep = (name,time) => {
    return new Promise (resolve=>{
        setTimeout(()=>{
            resolve();
        },time);
    });
};

const runTask = async () =>{
    await sleep('red',3000);
    await sleep('green',2000);
    await sleep('yellow',1000);
    runTask();
};

// runTask()

const asyncPool = async (poolLimit,promises,fn) => {
    const tasks = [];
    const runningTasks = [];
    for (const promise of promises){
        const task = Promise.resolve().then(() => fn(promise,promises));
        tasks.push(task);
        if (poolLimit <= promises){
            const e = task.then(() => runningTasks.splice(runningTasks.indexOf(e)),1);
            runningTasks.push(e); 
            if (runningTasks.length >= poolLimit){
                await Promise.race(runningTasks);
            } 
        }
    }
    return Promise.all(tasks);
};


class Scheduler {
    constructor(){
        this.count = 0;
        this.max = 3;
        this.queue = [];
    }

    add(task) {
        return new Promise((resolve)=>{
            this.queue.push(() => task().then(resolve));
            this.schedule();
        });
    }

    schedule() {
        while (this.queue.length > 0 && this.count < this.max){
            const task = this.queue.shift();
            const promise = task();
            this.count ++;
            promise.then(()=>{
                this.count --;
                this.schedule();
            });
        }
    }
}

const sleep_ = (time) => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        },time);
    });
};

const schedule = new Scheduler;

const addTask = (time) =>{
    schedule.add(()=>sleep_(time));
};

// addTask(1000)
// addTask(500)
// addTask(300)
// addTask(200)



class MySchedule {
    constructor(){
        this.count = 0;
        this.queue = 0;
        this.max = 0;
    }

    add(task){
        return new Promise((resolve) =>{
            this.queue(() => task().then(resolve));
            this.run();
        }); 
    }

    run() {
        while(this.queue.length > 0 && this.count < this.max){
            const task = this.queue.shift();
            const promise = task();
            this.count ++;
            promise.then(()=>{
                this.count --;
                this.run();
            });
        }
    }

}

const sheep = (time) => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        },time);
    });
};

const schedule_ = new MySchedule();

const addTask_ = (time)=>{
    schedule_.add(() => sheep(time));
};
addTask_(100);
addTask_(100);
addTask_(100);


const allSettle = (promises) => {
    let ans = [], cnt = 0; 
    return new Promise((resolve,reject) => {
        promises.forEach((promise,index)=> {
            Promise.resolve(promise).then(res=>{
                cnt ++;
                ans[index] = {status:'fulfilled', value: res};
                if (cnt === promises.length){
                    resolve(ans);
                }
            }).catch((err => {
                cnt ++;
                ans[index] = {status: 'rejected', value:err};
                if (cnt === promises.length) {
                    reject(ans);
                }
            }));
        });
    });
};
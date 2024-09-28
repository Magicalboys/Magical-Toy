import {post} from 'axios';

// 辅助函数：发起请求获取学生数据，并处理异常情况
async function fetchStudentData() {
    try {
        const response = await post('https://xxx.com/students');
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Response status is not 200');
        }
    } catch (error) {
        console.error('请求失败，重试...', error);
        return fetchStudentData(); // 重试请求
    }
}

// 判断学生是否符合条件
function isQualified(student) {
    const {score, time} = student;
    return score > 90 && new Date(time) > new Date('2021-12-03');
}

// 主函数：控制并发请求，收集符合条件的学生成绩
async function getQualifiedStudents(limit = 6, totalRequired = 100) {
    let results = []; // 用于存储符合条件的学生成绩

    // 通过池限制并发请求
    const asyncPool = async (poolLimit, fn) => {
        const tasks = []; // 存储所有的异步任务
        const runningTasks = []; // 存储正在执行的任务

        while (results.length < totalRequired) {
            const task = fn(); // 调用获取数据的函数，发起请求
            tasks.push(task);

            if (poolLimit <= totalRequired) {
                const e = task.then(() => runningTasks.splice(runningTasks.indexOf(e), 1));
                runningTasks.push(e);

                // 等待并发数量的限制
                if (runningTasks.length >= poolLimit) {
                    await Promise.race(runningTasks);
                }
            }

            // 处理每个请求返回的数据
            const studentData = await task;
            studentData.forEach(student => {
                if (isQualified(student) && results.length < totalRequired) {
                    results.push(student);
                }
            });
        }

        // 等待所有请求结束
        await Promise.all(tasks);
        return results;
    };

    // 使用 asyncPool，限制并发为6个请求，直到收集到100个符合条件的学生
    const qualifiedStudents = await asyncPool(limit, fetchStudentData);

    // 根据成绩从大到小排序
    qualifiedStudents.sort((a, b) => b.score - a.score);

    // 返回符合条件的学生成绩
    return qualifiedStudents.slice(0, totalRequired);
}

// 调用主函数，获取结果
getQualifiedStudents().then(students => {
    console.log('100名符合条件的学生成绩:', students);
}).catch(error => {
    console.error('获取学生成绩时出错:', error);
});


function promiseAllLimit(limit) {
    return function (promiseFactories) {
        let results = [];
        let running = 0;
        let completed = 0;
        let index = 0;
  
        return new Promise((resolve, reject) => {
            while (running < limit && index < promiseFactories.length) {
                nextPromise();
            }
  
            function nextPromise() {
                if (completed >= promiseFactories.length) {
                    resolve(results);
                    return;
                }
  
                if (index >= promiseFactories.length) {
                    return;
                }
  
                let currentIndex = index;
                let promiseFactory = promiseFactories[currentIndex];
                index++;
  
                promiseFactory().then(result => {
                    results[currentIndex] = result;
                    completed++;
                    running--;
                    if (completed >= promiseFactories.length) {
                        resolve(results);
                    } else {
                        nextPromise();
                    }
                }).catch(error => {
                    reject(error);
                });
  
                running++;
            }
        });
    };
}


const asyncPool = async (requestList,limit,callback) => {
    const promises = [];
    const pool = new Set();
    for (const request of requestList){
        if (pool.size >= limit){
            await Promise.race(pool).catch((err) => err);
        }
        const promise = request();
        const cb = () => {
            pool.delete(promise);
        };
        
        promise.then(cb,cb);
        
        pool.add(promise);
        
        promises.push(promise);
    }
    return Promise.allSettled(promises).then(callback,callback);
};











// const asyncPool = async (requestList,limit,callback) => {
//     const promises = [];
//     const pool = new Set();
//     for (let request of requestList){
//         if (pool.size >= limit){
//             await Promise.race(pool).catch((err) => err);
//         }
//         const promise = request();
//         const cbs = () => {
//             pool.delete(promise);
//         };
//         promise.then(cbs,cbs);
//         pool.add(promise);
//         promises.push(promise);
//     }
//     return Promise.allSettled(promises).then(callback,callback);
// };


const arrToTree = (arr) => {
    const root = [];
    const map = arr.reduce((pre,cur) => (pre[cur?.id] = cur,pre) ,{});
    for (let node of arr){
        if (node.parentId == 0){
            root.push(node);
            continue;
        } 
        if (map[node.parentId]){
            const parent = map[node.parentId];
            parent.children = parent.children ?? [];
            parent.children.push(node);
        }
    }
    return root;
};

Promise.prototype.myAll = (promises) => {
    const ans = [];
    let cnt = 0;
    return new Promise((resolve,reject) => {
        promises.forEach((item,index) => {
            Promise.resolve(item).then((res => {
                ans[index] = res;
                cnt ++;
                if (cnt === promises.length){
                    resolve(ans);
                }
            }))
                .catch(reject);
        });
    });
};



const pools = async (requestList,limit,callback)=>{
    const promises = [];
    const pool = new Set();
    for (let request of requestList){
        if (pool.size >= limit){
            await Promise.rice(pool).catch((error => error));
        }
        const promise = request();
        const cb = () => {
            pool.delete(promise);
        };
        promise.then(cb,cb);
        pool.add(promise);
        promises.push(promise);
    }
    return Promise.allSettled(promises).then(callback,callback);
}; 



const pool = async (requestList,limit,callback) => {
    const queue = new Set();
    const promises = [];
    for (let request of requestList) {
        if (queue.size > limit){
            await Promise.race(queue).catch(err => err);
        }
        const promise = request();
        const cb = () => {
            queue.delete(promise);
        };
        promise.then(cb,cb);
        queue.add(promise);
        promises.push(promise);
    }
    return Promise.allSettled(promises).then(callback,callback);
};

class Scheduler {
    constructor(){
        this.max = 2;
        this.queue = [];
        this.count = 0;
    }

    add(task){
        return new Promise((resolve)=>{
            this.queue.push(task.then(resolve));
            this.schedule();
        });
    }
    schedule(){
        while(this.queue.length > 0 && this.count < this.max){
            const task = this.queue.shift();
            const promise = task();
            this.count ++;
            promise().then((res) => {
                this.count --;
                this.schedule();
            });
        }
    }
} 

const sleep = (time) => {
    return new Promise((resolve,)=>{
        setTimeout(()=>{
            resolve();
        },time);
    });
};

const schedule = new Scheduler();

const addTask = (time,flag) =>{
    schedule.add(() => sleep(time)).then((res) => console.log(res));
};
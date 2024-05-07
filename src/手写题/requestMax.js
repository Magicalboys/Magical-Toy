class Scheduler {
    constructor(){
        this.max = 2;
        this.count = 0;
        this.queue = [];
        this.ans = [];
    }

    add(task){
        return new Promise(resolve => {
            this.queue.push(() => task().then(resolve));
            this.schedule();
        })
    }

    schedule(){
        while (this.count < this.max && this.queue.length > 0){
            const task = this.queue.shift();
            const promise = task();
            this.count ++;
            promise.then (res => {
                this.count --;
                this.schedule();
            })
        }
    }
}

const sleep = (time) => {
   return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(time)
        },time)
   })
}

const schedule = new Scheduler();

const addTask = (time) => {
    schedule.add(() => sleep(time))
    .then(res=> {
        console.log(res);
    } );
}

addTask(1000)
addTask(500)
addTask(300)
addTask(400)



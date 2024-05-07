Array.prototype.MyReduce = function(fn,init = 0){
    let ans = init;
    this.forEach((item,index,arr) => {
        ans = fn(ans,item,index,arr);
    })
    return ans;
}


Array.prototype.map = function(fn){
    const ans = [];
    this.forEach((item,index,arr)=>{
        ans[index] = fn(item,index,arr)
    })
    return ans;
}

Array.prototype.MyFilter = function(fn){
    const ans = [];
    this.forEach((item,index,arr)=>{
        if (fn(item,index,arr)){
            ans.push(item);
        }
    })
    return ans;
}

Array.prototype.MyFind = function(fn){
    this.forEach((item,index,arr) => {
        if (fn(item,index,arr)){
            return this;
        }
    })
}

const a = [].every(item => item > 1)


const str = 'get_user_id';

const format = (str) => {
    return str.replace(/_([a-z])/g,(match,key)=>{
        return key.toUpperCase();
    })
}

const b = format(str);

console.log(b)



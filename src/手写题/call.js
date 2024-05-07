Function.prototype.MyCall = (context,...arg) => {
    context = context || window;
    
    arg = arg ? arg : [];

    const key = Symbol(); 
    
    context[key] = this;
    
    const res = context[key](...arg);

    delete context[key];

    return res;
};

const a = [1,2,3].reverse();
console.log(a)

const mynNew = (obj) => {
   const cur =  Object.create(obj);
   cur.__proto__ = obj.prototype;
   
   return cur; 
}
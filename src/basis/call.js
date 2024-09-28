Function.prototype.MyCall = (context,...arg) => {
    context = context || window;
    
    arg = arg ? arg : [];

    const key = Symbol(); 
    
    context[key] = this;
    
    const res = context[key](...arg);

    delete context[key];

    return res;
};

const obj = {
    name:'shenqi',
    age:18
};
  
function add(a,b){
    console.log(a + b,this);
}

add.mycall(obj);

const mynNew = (obj) => {
    const cur = Object.create(obj);
    cur.__proto__ = obj.prototype;
   
    return cur; 
};

Function.prototype.MyCall = (context, ...arg) => {
    context = context ?? window;
    arg = arg ? arg : [];
    const key = Symbol();
    context[key] = this;
    const res = context[key](...arg);
    delete context[key];
    return res;
};


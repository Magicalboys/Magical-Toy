const instanceOf = (target , fn) => {
    let proto = target.__proto__;
    let prototype = fn.prototype;
    while(1){
        if (proto === prototype) return true;
        if (proto === null) return false;
        proto = proto.__proto__; 
    }
};

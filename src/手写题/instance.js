const instance = (target , fn) => {
    const proto = target.__proto__;
    let prototype = fn.prototype;
    while(true){
        if (proto === prototype) return true;
        if (proto === null) return false;
        proto = proto.__proto__ 
    }
}

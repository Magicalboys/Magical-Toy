const DeepClone = (target , map = new Map) =>{
    if (target instanceof Function) return function(...arg){
        target.call(this,...arg);
    };
    if (typeof target !== 'object' && target === null) return target;
    if (map.has(target)){
        return map.get(target);
    }
    const obj = Array.isArray(target) ? [] : {};
    map.set(target,obj);
    for (const key in target){
        obj[key] = DeepClone(target[key],map);
    }
    return obj;
};














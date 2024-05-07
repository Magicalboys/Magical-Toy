// 深拷贝
const DeepClone = (target, map = new Map) => {
    if (target === null || typeof target !== 'object'){
        return target;
    }
    
    if (map.has(target)){
        return map.get(target);
    }
    const obj = Array.isArray(target) ? [] : {};
    map.set(target,obj);
    for(const key in target){
        obj[key] = DeepClone(obj[key],map);
    }
    return obj;
};






const deepClone = (target,map = new Map) =>{
    if (target === null || typeof target  === 'object'){
        return target;
    }
    const obj = Array.isArray(target) ? [] : {};

    if (map.has(target))
    return map.get(target);
    
    map.set(target,obj);
    for (let key in target){
        obj[key] = deepClone(target[key],map);
    }
    return obj;
}


















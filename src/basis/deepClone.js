// const DeepClone = (target , map = new Map) =>{
//     if (target instanceof Function) return function(...arg){
//         target.call(this,...arg);
//     };
//     if (typeof target !== 'object' && target === null) return target;
//     if (map.has(target)){
//         return map.get(target);
//     }
//     const obj = Array.isArray(target) ? [] : {};
//     map.set(target,obj);
//     for (const key in target){
//         obj[key] = DeepClone(target[key],map);
//     }
//     return obj;
// };








const deepClone = (context, map = new Map()) => {
    if (typeof context === 'function'){
        return function(...arg){
            context.call(this,...arg);
        };
    }

    if (typeof context !== 'object' && context === null) {
        return context;
    }

    let obj = Array.isArray(context) ? [] : {};

    if(map.has(context)){
        return map.get(context);
    }

    map.set(context,obj);

    for (let key in map){
        obj[key] = deepClone(context[key],map);
    }
    return obj;
};







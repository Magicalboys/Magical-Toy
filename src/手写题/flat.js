const arr = [[1,[2],3],2,3,4];

// const flat = (arr) => {
//     return arr.reduce((pre,cur) => {
//         return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
//     },[]);
// };


const flat = (arr,cnt) => {
    if (!cnt) return arr;
    return arr.reduce((pre,cur)=> {
        return pre.concat( Array.isArray(cur) ? flat(cur,cnt - 1) : cur);  
    },[]);
};

const a = flat(arr,2);
console.log('a', a);

const arr = [[1,[2],3],2,3,4];

const flat = (arr) => {
    return arr.reduce((pre,cur) => {
        return pre.concat(Array.isArray(cur) ? flat(cur) : cur)
    },[])
}

const a = flat(arr);
console.log('a', a);
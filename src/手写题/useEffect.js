const a = {
    name: 'yaoshicheng',
    // age: {
    //     year: 20,
    //     month: 12, 
    // }
};
const b = {
    name: 'yaoshicheng', 
    // age: {
    //     year: 20,
    //     month: 12,
    // }
};
const ans = Object.is(a,b);
console.log(ans);
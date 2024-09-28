// sum函数，支持连续调用，每次支持传入多个参数；并支持sumOf方法，对传入所有参数求和。
// 例如 sum(1, 2)(3).sumof() 返回

const sum = (...arg) =>{
    let res = 0;
    const add = (...arg) => {
        arg.forEach(item => res += item);
        return add;
    };
    add.sumOf = () => {
        return res;
    };
    return add(...arg);
};

console.log(sum(1,2).sumOf());


const sum2 = (...arg) => {
    let sum = 0;
    const add = (...arg) => {
        arg.forEach(num => sum += num);
        return add;
    };
    add.sumOf = () => {
        return sum;
    };
    return add(...arg);
};
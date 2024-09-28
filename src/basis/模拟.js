// 给一个整型数组，比如[1, 2, 3, 5, 7, 9, 10, 11, 12, 26, 27]，
// 将其中连续的数字用 “-” 连接，输出格式如: ['1-3' 5, 7, '9-12', '26-27']

// const fun = (arr) => {
//     const n = arr.length;
//     const ans = [];
//     let cnt = 0 , l = arr[0];
//     if (arr.length == 1) return [arr[0]];
//     for (let i = 1 ; i < n ; i ++){
//         if (arr[i] - arr[i - 1] == 1 ){
//             cnt ++;
//         }
//         if (arr[i] - arr[i - 1] !== 1 || i === n - 1)
//         {
//             if (cnt > 0){
//                 const r = l + cnt;
//                 ans.push(l + '-' + r);
//             } else if (cnt == 0){
//                 ans.push(l);
//             }
//             l = arr[i];
//             cnt = 0;
//         }
//         l = Math.min(l , arr[i]);
//     }
//     return ans;
// }

const fun = (arr) => {
    const n = arr.length;
    const ans = [];
    let pre = arr[0]; // 初始化为数组的第一个元素
    for (let i = 1; i < n; i++) {
        if (arr[i] - arr[i - 1] !== 1) {
            // 如果当前元素与前一个元素不连续
            if (arr[i - 1] !== pre) {
                // 如果前一个元素不等于l，说明有一个连续序列
                ans.push(`${pre}-${arr[i - 1]}`); // 添加连续序列
            } else {
                ans.push(pre); // 否则，只添加单个元素
            }
            pre = arr[i]; // 更新l为当前元素
        }
    }
    // 处理最后一个元素或连续序列
    if (arr[n - 1] !== pre) {
        ans.push(`${pre}-${arr[n - 1]}`);
    } else {
        ans.push(pre);
    }
    return ans;
};

// 测试用例
console.log(fun([1])); // 输出: ['1-3', 5, 7, '9-12', '26-27']

// console.log(fun([1,2,3,4,5,6,7,100]))
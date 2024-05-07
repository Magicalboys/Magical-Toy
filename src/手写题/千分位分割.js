const fun = (str) => {
    let ans = [] , index = 0 ;
    const [num1,num2] = str.split('.')
    const n = num1.length;
    for (let i = 0 ; i < n ;i ++){
        index ++;
        ans.push(num1[i]);
        if (index % 3 == 0 && index !== n){
            ans.push(',')
        }
    }
    const res = num2 ? ans.join('')+ '.' + num2 : ans.join('')
    return res;
}

// 举例：一个ip地址为10.0.3.193
// 每段数字             相对应的二进制数
// 10                   00001010
// 0                    00000000
// 3                    00000011
// 193                  11000001

// 组合起来即为：00001010 00000000 00000011 11000001, 转换为10进制数就是：167773121，即该IP地址转换后的数字就是它了。
const toNum = (ip) => {
    // 10 -> 分段 -> 转换成 2 进制-> 每段补 8 位前导零 -> 拼接完成IP -> 转换成整数
    const res = ip.split('.').map(item => Number(item).toString(2)).map(item => item.padStart(8, '0'))
    const num = parseInt(res.join(''), 2);
    return num;
};

const toIp = (num) => {
    // 10 -> 转换成 2 进制 -> 补 32 前导零 -> 分段每 8 个一组 -> 转换成 10进制
    const str = Number(num).toString(2).padStart(32,'0');
    const res = [str.slice(0,8),str.slice(8,16),str.slice(16,24),str.slice(24,36)];
    const ip = res.map(item => parseInt(item,2)).join('.')
    return ip;
}

// console.log(fun('123456789'))
console.log(toNum('10.0.3.193'))
console.log(toIp('167773121'))
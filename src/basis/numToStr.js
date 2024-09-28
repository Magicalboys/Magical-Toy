// 定义了一个名为numberToChinese的函数，它接受一个数字作为参数
const numberToChinese = (num) => {

    // 定义单位数组，用于表示中文的数位，从个位到千位
    const units = ['', '十', '百', '千', '万'];
    // 定义字符数组，用于表示1到10的中文表述（含10）
    const chars = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

    const ZERO = '零';

    if (num === 0) return ZERO;

    let ans = '' , n = Math.floor(Math.abs(num));

    for (let i = 0 ; i < 5 && n != 0; i ++){
        const cur = n % 10;
        if (cur === 0 && i != 0){
            ans = ZERO + ans;
        } else {
            ans = chars[cur] + units[i] + ans;
        }
        n = Math.floor(n / 10);
    }
    // if (ans == '') return ZERO;
    if (num < 0) ans = '-' + ans;
    ans = ans.replace(/零+/g,'零').replace(/零+$/,'').replace(/^一十/,'十');
    return ans;
};

// 测试函数，打印1234的中文表述
console.log(numberToChinese(10104)); // 输出：一千二百三十四

// 测试函数，打印0的中文表述
console.log(numberToChinese(1900)); // 输出：零

// 测试函数，打印-10的中文表述
console.log(numberToChinese(10051)); // 输出：负十

const find = (s) => {
    if (s.length === 0) return '';
    s.sort((a,b) => a.length - b.length);
    const shortest = s[0];
    let m = shortest.length;
    let ans = '';

    // 遍历最短字符串的每个可能的子串长度
    for (let i = 1 ; i <= m ;i ++){
        // 遍历每个起始位置，生成子串
        for (let j = 0 ; j <= m - i; j ++){
            const substr = shortest.slice(j ,j + i);
            const flag = s.every((str) => str.includes(substr)) && substr.length > ans.length;
            if (flag){
                ans = substr;
            }
        }
    }
    console.log(ans);
};
find(['aaab','abc','c']);


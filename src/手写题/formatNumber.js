// "1,234.5678"
const format = (s) => {
    const n = s.length;
    const temp = [];
    s = [...s].reverse();
    for (let i = 1 ; i <= n ; i ++){
        temp.push(s[i - 1]);
        if (i % 3 === 0){
            temp.push(',');
        }
    }
    const res = temp.reverse().join('');
    console.log(res);
};

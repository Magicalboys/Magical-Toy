// const minus = (x,y) => {
//     const maxLength = Math.max(x.length,y.length);
//     x = x.padStart(maxLength,'0');  
//     y = y.padStart(maxLength,'0');  
//     let f = 0 , ans = '';
//     for (let i = maxLength - 1;  i >= 0 ; i --){
//         let t = parseInt(x[i]) - parseInt(y[i]) - f;
//         if (t < 0){
//             t += 10;
//             f = 1;
//         } else {
//             f = 0;
//         }
//         ans = t + ans;
//     }
//     return ans.replace(/^0+/,'');
//   }

//   const ans = minus('11111','11100')
//   console.log(ans)



const minus = (x, y) => {
    let ans = '' ,flag = false;
    if (x.length < y.length || (x.length === y.length && x < y)) {
        [x, y] = [y, x];
        flag = true;
    }
    const maxLength = Math.max(x.length, y.length);
    x = x.padStart(maxLength, '0');
    y = y.padStart(maxLength, '0');
    let f = 0;
    for (let i = maxLength - 1; i >= 0; i--) {
        let t = parseInt(x[i]) - parseInt(y[i]) - f;
        if (t < 0) {
            t += 10;
            f = 1;
        } else {
            f = 0;
        }
        ans = t + ans;
    }
    let res = ans.replace(/^0+/, '');
    return flag ? '-' + res : res;
}

let a = minus('1','17')
console.log(a)

















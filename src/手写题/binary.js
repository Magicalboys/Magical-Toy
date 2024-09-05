// function binary(s) {
//     let ans = 0;
//     let x;

//     // Reverse the string
//     s = s.split('').reverse().join('');

//     for (let i = 0; i < s.length; i++) {
//         if (s[i] >= '0' && s[i] <= '9') {
//             x = s[i].charCodeAt() - '0'.charCodeAt();
//         } else {
//             x = s[i].charCodeAt() - 'A'.charCodeAt() + 10;
//         }
//         ans += Math.pow(2, i) * x;
//     }

//     return ans;
// }

// const binaryTwo =  (s) => {
//     let ans = '' , x;
//     while (s){
//         x = s % 2;
//         ans = x + ans;
//         s = Math.floor(s / 2);
//     }
//     return ans;
// }


// // Example usage:
// let inputString = 8;
// // let decimalValue = base36ToDecimal(inputString);
// let decimalValue = binaryTwo(inputString);
// console.log(decimalValue); // Output the decimal representation of the base 36 number

// 10 -> 2
const binary = (num, x) => {
    let ans = '';
    while (num){
        ans = num % x + ans;
        num = Math.floor( num / x);
    }
    return ans;
};

console.log(binary(9,10));
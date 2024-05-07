// ;ab;;b;;;e;;  --> ab;b;e
const str = ';;;;ab;;b;;;e;;';
let s = str.replace(/^;+/,'').replace(/;+$/,'');
let a = s.replace(/\;+/g,';');
console.log(a)
// console.log(s)
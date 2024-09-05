
function duplicateRemoval(inputStr){
    const arr = [...inputStr];
    const set = new Set(arr);
    const ans = [...set].join('');
    return ans;
}
console.log(duplicateRemoval('12222131112'));

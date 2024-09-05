const quickSort = (arr) => {
    if (arr.length <= 1 || !arr) return arr;
    const value = arr.shift();
    let left = [];
    let right = [];
    for (let i = 0 ; i < arr.length ;i ++){
        if (arr[i] < value){
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    left = quickSort(left) , right = quickSort(right);
    return left.concat([value],right);
};
console.log(quickSort([1,4,4,2,15,7,3,1]));
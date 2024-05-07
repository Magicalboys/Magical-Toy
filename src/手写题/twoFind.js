var search = function(nums, target) {
    let n = nums.length;
    let l = 0 , r = n - 1 ; 
    while( l < r ){
        let mid = Math.floor((l + r ) / 2 );
        if(nums [ mid ] >= target ){
            r = mid;
        }else{
            l = mid + 1 ; 
        }
    }
     return nums[l] === target ? l : -1 ;
};

let ans = search([1,3,3,4,6],3)
console.log(ans)
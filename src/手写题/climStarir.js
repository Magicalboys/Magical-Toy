//4
// 1 1 1 1
// 1 1 2
// 1 2 1
// 2 1 1
// 2 2
// 
function climStairs(n){
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 2;
    for (let i = 2 ; i <= n ;i ++){
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

console.log(climStairs(4));
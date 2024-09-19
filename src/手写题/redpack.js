// 写一个分红包函数，它接受四个参数，
// 第一个为金额总数，第二个为红包个数，第三个为每个红包的最小金额，第四个为红包的最大金额
// 返回一个分好的红包集合，只需要考虑整形即可。（回溯）

const fn = (sum,cout,min,max) => {
    let ans = [];
    const dfs = (start,cur,res) => {
        if (cur.length === cout && res === sum){
            ans.push(cur);
            return; 
        }
        for (let i = start ; i <= Math.min(sum - res,max); i ++){
            dfs([...cur,i],res + i);
        }
    };
    dfs(min,[],0);
    return ans;
};
console.log(fn(10,6,1,2));

// M个苹果分成不重复的N组
var combine = function (m,n) {
    const ans = [];
    const dfs = (start, cur) => {
        if (cur.length === n) {
            ans.push(cur);
            return;
        }
        for (let i = start; i <=  m; i++) {
            dfs(i + 1, [...cur, i]);
        }
    }
    dfs(1, [])
    return ans;
};
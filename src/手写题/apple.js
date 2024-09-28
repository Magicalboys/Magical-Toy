// M个苹果分成不重复的N组
var combine = function (m,n) {
    const ans = [];
    const dfs = (start, cur) => {
        if (cur.length === n) {
            ans.push(cur);
            return;
        }
        for (let i = start; i <= m; i++) {
            dfs(i + 1, [...cur, i]);
        }
    };
    dfs(1, []);
    return ans;
};


const first = () =>
    new Promise((resolve, reject) => {
        console.log(3);
        let p = new Promise((resolve, reject) => {
            console.log(7);
            setTimeout(() => {
                console.log(5);
                resolve(6);
            }, 0);
            resolve(1);
        });
        resolve(2);
        p.then((arg) => {
            console.log(arg);
        });
    });
first().then((arg) => {
    console.log(arg);
});
console.log(4);

// 3 7 4 2 1 5
  

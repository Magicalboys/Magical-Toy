// 例如 输入 [2 9 3 5 1] 返回 [2 3 5]，[9 1]

const fun = (arr) => {
    const sum = arr.reduce((pre,cur) => pre + cur,0);
    if (sum % 2 != 0) return [];
    const res = sum / 2;
    const ans = [];
    const dfs = (start,cur,leftSum) => {
        if (leftSum === res){
            ans.push([...cur]);
            return;
        }
        for(let i = start ; i < arr.length;i ++){
            dfs(i + 1,[...cur,arr[i]],leftSum + arr[i]);
        }
    };
    dfs(0, [],0);
    console.log(ans);
};

// fun([3,2,1]);
for(let x = 0 ; x < 3 ; x++){
    setTimeout(function(){console.log(x);});
    console.log(x);
}
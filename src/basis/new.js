const MyNew = (constructor,...arg) => {
    const obj = {}; 
    
    obj.__proto__ = constructor.prototype;
    
    const res = constructor.apply(obj,...arg);
    
    return res instanceof Object ? res : obj;
};

const jump = (arr,m) => {
    const n = arr.length;
    const dp = new Array(n).fill(-10e5 + 1);
    dp[0] = m;
    for (let i = 0 ; i < n ; i ++){
        if (dp[i] < 0) continue;
        for (let j = i + 1 ; j < n ;j ++){
            const cost = j - i;
            const next = dp[i] - cost + arr[j];
            if (next > 0){
                dp[j] = Math.max(dp[j],next);
            }
        }
    }
    return dp[n - 1] > 0 ? dp[n - 1] : -1;

};

const a = jump([1, 2, -1, -2, -1, -2, 1, 1, 2],6);


const fun = (s) => {
    const n = s.length;
   
    const dfs = (index) => {
        const stk = [];
        let sign = '+', number = 0 , i = index ;
        while (i < n){
            let char = s[i];
            if (!isNaN(char) && char !== ' '){
                number = number * 10 + parseInt(char);
            }
            else if (char == '('){
                [number,index] = dfs(index + 1);
            }

            if ((isNaN(char) && char != '') || n - 1 == i){
                switch(sign){
                case '+':
                    stk.push(+ number);
                    break;
                case '-':
                    stk.push(- number);
                    break;
                case '*':
                    stk.push(stk.pop() * number);
                    break;
                case '/':
                    stk.push(stk.pop() / number);
                    break;
                }
                sign = char;
                number = 0;
            }

            if (char == ')') break;
            i ++;
        }
        let sum = 0 ;
        sum = stk.forEach(item => sum += item);
        return [sum,i];
    };
};
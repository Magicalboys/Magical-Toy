const parseIntFun = (str) => {
    const ZERO = '0'.charCodeAt();
    let ans = 0 ;
    for (let s of str){
        if ('0' <= s && s <= '9'){
            ans = ans * 10 + (s.charCodeAt() - ZERO);
        } else {
            return ans;
        }
    }
    return ans;
};

const a = parseIntFun('1234a');
console.log(a + 1);
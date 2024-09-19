// 手写字符串indexOf方法，基本的实现之后考虑startIndex为负数的情况

const indexOf = (str,searchStr,startIndex) => {
    const strLen = str.length;
    const targetLen = searchStr.length;

    if (startIndex < 0) {
        startIndex = strLen + startIndex; 
    }

    if (startIndex >= strLen){
        return -1;
    }
    for (let i = startIndex ; i < strLen ; i ++){
        let j ;
        for (j = 0 ; j < targetLen ; j ++){
            if (str[i + j] !== searchStr[j]){
                break;
            }
            
        }
        if (j === targetLen){
            return i;
        }
    }
    return -1;
};
let url = `http://www.domain.com/?user=anonymous&id=123&id=456
 					 &city=%E5%8C%97%E4%BA%AC&enabled`;

const parseParam = (url) => {
    const param = url.split('?')[1];
    const paramArr = param.split('&');
    const obj = {};
    paramArr.map(item => {
        let [key,value] = item.split('=');
        value = value ? decodeURI(value) : true;
        if (obj[key]){
            Array.isArray(obj[key]) ? obj[key].push(value) : obj[key] = [obj[key]].push(value);
        } else {
            obj[key] = value;
        }
    });
    return obj;
};

// springBoot
// spring_boot

const format = (target) => {
    const arr = target.split('');
    const ans = arr.map((str,index) => {
        if (str === str.toUpperCase() && index){
            return '_' + str.toLowerCase();
        } else {
            return str;
        }
    }).join('');
    return ans;
};

console.log(format('ApringBoot'));
// const a = console.log(parseParam(url))
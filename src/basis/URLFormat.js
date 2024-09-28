let url = 
'http://www.domain.com/?user=anonymous&id=123&id=456&id=789&city=%E5%8C%97%E4%BA%AC&enabled';

const format = () => {
    const obj = url.split('?')[1];
    const data = obj.split('&');
    const ans = {};
    for (let str of data){
        const s = str.split('=');
        let [key , val] = s;
        val = val ? decodeURI(val) : true;
        if(ans[key]){
            !Array.isArray(ans[key]) ? ans[key] = [ans[key]] : '';
            ans[key].push(val);
        }else {
            ans[key] = val;
        }
    }
    return ans;
};

const ans = format(url);

console.log(ans);
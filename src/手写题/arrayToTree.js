let list = [
    { id: 1, name: '部门A', parentId: 0 },
    { id: 2, name: '部门B', parentId: 0 },
    { id: 3, name: '部门C', parentId: 1 },
    { id: 4, name: '部门D', parentId: 1 },
    { id: 5, name: '部门E', parentId: 2 },
    { id: 6, name: '部门F', parentId: 3 },
    { id: 7, name: '部门G', parentId: 2 },
    { id: 8, name: '部门H', parentId: 4 }
];

// const convert = (list) => {
//     const res = [];
//     const map = list.reduce((pre,cur) => (pre[cur?.id] = cur , pre) ,{})
//     for (let item of list){
//         if (item.parentId === 0){
//             res.push(item);
//             continue;
//         }
//         if (item.parentId in map){
//             const parent = map[item.parentId]
//             parent.children = parent.children || []
//             parent.children.push(item);
//         }
//     }
//     return res;
// };

const convert = (list) => {
    const ans = [];
    const map = list.reduce((pre, cur) => (pre[cur?.id] = cur, pre), {})
    for (let item of list) {
        if (item.parentId == 0) {
            ans.push(item);
        } else {
            const parentId = item.parentId;
            const parent = map[parentId];
            parent.children = parent.children ?? [];
            parent.children.push(item);
        }
    }
    return ans
}

const a = convert(list);

console.log(a);



function getChildren(id) {
    var hasFound = false, // 表示是否有找到id值
        result = null;
    var fn = function (data) {
        if (Array.isArray(data) && !hasFound) { // 判断是否是数组并且没有的情况下，
            data.forEach(item => {
                if (item.id === id) { // 数据循环每个子项，并且判断子项下边是否有id值
                    result = item; // 返回的结果等于每一项
                    hasFound = true; // 并且找到id值
                } else if (item.children) {
                    fn(item.children); // 递归调用下边的子项
                }
            })
        }
    }
    fn(data); // 调用一下
    return result;
}






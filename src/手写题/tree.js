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

const map = list.reduce((pre,cur) => {
    pre[cur.id] = cur;
    return pre;
},{})

const arrayToTree = (list) => {
    let tree = []
    for (let i = 0 ; i < list.length ; i ++){
        if (list[i].parentId == 0){
            tree.push(list[i])
        } else {
            const parentId = list[i].parentId;
            const parent = map[parentId];
            parent.children = parent.children || [];
            parent.children.push(list[i]);
        }
    }
    return tree;
};
const a = arrayToTree(list)
console.log(a)

const source = { 
    a: { 
      b: { c: 1, d: 2 },
      e: 3 
    }, 
    f: { g: 2 } 
  };

const flat = (obj,pre = '',ans = {}) => {
    Object.entries(obj).forEach(([key,value]) => {
        typeof value === 'object' ? flat(value,pre + key + '.' , ans) : ans[pre + key] = value;
    })
    return ans;
}

const b = flat(source)
console.log(b);

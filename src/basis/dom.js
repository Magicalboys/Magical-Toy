function createElement(vnode) {
    // 创建元素节点
    const element = document.createElement(vnode.tag);
    
    // 处理元素的属性（如 id 等）
    if (vnode.attrs) {
        Object.entries(vnode.attrs).forEach(([key,value]) => {
            element.setAttribute(key, value);
        });
    }
  
    // 递归处理子元素
    if (vnode.children) {
        vnode.children.forEach(child => {
            element.appendChild(createElement(child));
        });
    }
  
    return element;
}
  
// 虚拟DOM
const vdom = {
    tag: 'DIV',
    attrs: {
        id: 'app'
    },
    children: [
        {
            tag: 'SPAN',
            children: [
                {tag: 'A', children: []}
            ]
        },
        {
            tag: 'SPAN',
            children: [
                {tag: 'A', children: []},
                {tag: 'A', children: []}
            ]
        }
    ]
};
  
// 将虚拟DOM转化为真实DOM并追加到 body 中
console.log(createElement(vdom));
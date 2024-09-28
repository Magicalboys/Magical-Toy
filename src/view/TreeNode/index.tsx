import React, {useState} from 'react';
import './index.css'; // 导入样式文件

// 定义树节点数据类型
interface TreeNodeData {
    id: number;
    name: string;
    children: TreeNodeData[];
}

// 示例树形数据
const treeData: TreeNodeData[] = [
    {
        id: 1,
        name: '根节点 1',
        children: [
            {id: 2, name: '子节点 1-1', children: []},
            {
                id: 3,
                name: '子节点 1-2',
                children: [
                    {id: 4, name: '子节点 1-2-1', children: []},
                ],
            },
        ],
    },
    {
        id: 5,
        name: '根节点 2',
        children: [
            {id: 6, name: '子节点 2-1', children: []},
            {id: 7, name: '子节点 2-2', children: []},
        ],
    },
];

// 树节点组件
interface TreeNodeProps {
    node: TreeNodeData;
}

const TreeNode: React.FC<TreeNodeProps> = ({node}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="tree-node">
            <div onClick={toggle} className="node-label">
                {node.children.length > 0 && (isOpen ? '[-]' : '[+]')} {node.name}
            </div>
            {isOpen && node.children.map((childNode) => (
                <TreeNode key={childNode.id} node={childNode} />
            ))}
        </div>
    );
};

// 树组件
interface TreeProps {
    data?: TreeNodeData[];
}

export const Tree: React.FC<TreeProps> = ({data = treeData}) => {
    return (
        <div className="tree">
            {data.map((node) => (
                <TreeNode key={node.id} node={node} />
            ))}
        </div>
    );
};


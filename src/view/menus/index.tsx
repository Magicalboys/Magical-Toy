import React, {useState} from 'react';
import {MenuItem} from './MenuItem'; // 假设 MenuItem 组件在同一目录下

const Menu = () => {
    const [menuItems, setMenuItems] = useState([
        {id: 1, name: 'Home'},
        {id: 2, name: 'About'},
        {id: 3, name: 'Contact'},
    // ... 其他菜单项
    ]);

    const handleEdit = (id: number, newName: string) => {
        setMenuItems(
            menuItems.map((item) =>
                item.id === id ? {...item, name: newName} : item
            )
        );
    };

    const handleDelete = (id: number) => {
        setMenuItems(menuItems.filter((item) => item.id !== id));
    };

    return (
        <div>
            {menuItems.map((item) => (
                <MenuItem
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default Menu;

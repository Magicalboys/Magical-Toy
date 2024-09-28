/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';

interface ITodo {
  id: number;
  content: string;
  finish: boolean;
}
function TodoPro() {
    const [todo, setTodo] = useState<ITodo[]>([]);
    const [value, setValue] = useState('');

    // 持久化
    useEffect(() => {
        const inputValueJson = localStorage.getItem('inputValue');
        if (inputValueJson) {
            const inputValue = JSON.parse(inputValueJson);
            setTodo(inputValue);
        }
    
    }, []);
  
    // 添加元素
    const addTodo = () => {
    // if (value.trim() !== "") {
        const newTodo: ITodo = {
            id: Date.now(),
            content: value.trim(),
            finish: false,
        };
        const inputValue = JSON.stringify([...todo, newTodo]);
        localStorage.setItem('inputValue', inputValue);
        setTodo([...todo, newTodo]);
        setValue('');
    // }
    };
    for(let i = 0 ; i < 100 ; i ++){
    // addTodo()
    }
    
    // 更新输入框内容
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    // 删除元素
    const deleteTodo = (id: number) => {
        const newTodo = todo.filter((item) => item.id !== id);
        setTodo(newTodo);
    };

    // 回车添加 元素
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            addTodo();
        }
    };
    // 完成代办
    const handleCheck = (id: number) => {
        const newTodo = todo.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    finish: !item.finish,
                };
            } else {
                return item;
            }
        });
        setTodo(newTodo);
    };

    // 确定落点 插入元素
    const handleDrop = (e: React.DragEvent<HTMLLIElement>, endIndex: number) => {
    // 拖拽起点元素的下标
        const startIndex = Number(e.dataTransfer.getData('start'));
        if (startIndex !== endIndex) {
            const newTodo = [...todo];
            // 删除开始拖动的元素
            const [startTodo] = newTodo.splice(startIndex, 1);
            // 插入开始拖动的元素
            newTodo.splice(endIndex, 0, startTodo);
            setTodo(newTodo);
        }
    };


    // 更新元素 内容
    const updateValue = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        const newTodo = todo.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    content: e.target.value,
                };
            } else {
                return item;
            }
        });
        setTodo(newTodo);
    };

    // 保存拖拽起点元素数据
    const handleDrag = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    // 存储拖拽起点下标
        e.dataTransfer.setData('start', String(index));
        e.dataTransfer.dropEffect = 'move';
    // e.stopPropagation() //阻止冒泡
    };



    return (
        <div className="App">
            <input value={value} onChange={handleChange} onKeyDown={(e)=>handleKeyPress(e)}></input>
            <button onClick={addTodo}>add</button>
            <ul>
                {
                    todo.map((item, index) => {
                        return (
                            <li
                                key={item.id}
                                id={item.id.toString()}
                                draggable
                                onDragStart={(e) => handleDrag(e, index)}
                                //阻止冒泡 阻止浏览器的默认拖拽
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleDrop(e, index)}
                            >
                                <input
                                    type="checkbox"
                                    checked={item.finish}
                                    onChange={() => handleCheck(item.id)}
                                    id={item.id.toString()}
                                />
                                <input
                                    id={item.id.toString()}
                                    onChange={(e) => updateValue(e, item.id)}
                                    value={item.content.toString()}
                                    style={{textDecoration:item.finish ? 'line-through' : 'none'}}
                                ></input>
                                <button
                                    id={item.id.toString()}
                                    onClick={() => deleteTodo(item.id)}
                                >
                删除
                                </button>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default TodoPro;

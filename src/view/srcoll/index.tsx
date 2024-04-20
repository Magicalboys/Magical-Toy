/* eslint-disable react/react-in-jsx-scope */
import {useMemo, useState} from 'react';
import './index.css';
interface prop {
  containerHeight: number;
  itemHeight: number;
  itemCount: number;
  Component: React.FC<IItem>;
  children: any;
}

interface IItem {
  children: React.ReactNode;
  key: number;
  style: { height: number };
}

const Item: React.FC<IItem> = ({style, children}) => {
    // ...函数组件的实现
    return (
        <div style={style} className="item">
            {children}
        </div>
    );
};

export default function Srcoll() {
  
    const containerHeight = 500,itemHeight = 20,itemCount = 100000;
    const contentHeight = itemHeight * itemCount; //内容总高度
    const [scrollTop, setScrollTop] = useState(0); //顶部相对内容总高度的滚动位置 
    //继续需要渲染的item索引有哪些
    let startIdx = Math.floor(scrollTop / itemHeight);
    let endIdx = Math.floor((scrollTop + containerHeight) / itemHeight); 
  
    // 上下额外多渲染几个item，解决滚动时来不及加载元素出现短暂的空白区域的问题
    const paddingCount = 5;
    startIdx = Math.max(startIdx - paddingCount, 0); //处理越界情况
    endIdx = Math.min(endIdx + paddingCount, itemCount - 1);

    const top = useMemo(()=>{
        const top = itemHeight * startIdx ;
        return top;
    },[itemHeight,startIdx]); //第一个渲染的item到顶部距离 
  
    //需要渲染的items
    const items = useMemo(() => {
        const items = [];
        for (let i = startIdx; i <= endIdx; i++) {
            items.push(
                <Item key={i} style={{height: itemHeight}}>
                    {i}
                </Item>
            );
        }
        return items;
    }, [startIdx, endIdx, itemHeight]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const target = e.target as HTMLDivElement; // 类型断言为HTMLDivElement
        const scrollTop = target.scrollTop;
        setScrollTop(scrollTop);
    };

    return (
        <div
            style={{height: containerHeight, overflow: 'auto'}}
            onScroll={(e) => handleScroll(e)}
        >
            <div style={{height: contentHeight}}>
                {/*一个将items往下推到正确位置的空元素*/}
                <div style={{height: top}}></div>
                {items}
            </div>
        </div>
    );
}

import React, {useRef, useState, useEffect, useCallback, useMemo} from 'react';
import {faker} from '@faker-js/faker';
import './index.css';
interface ListItem {
  index: number;
  text: string;
}

interface ItemPosition {
  index: number;
  top: number;
  bottom: number;
  height: number;
}

export const VirtualList: React.FC = () => {
    const mock = useMemo(()=>{
        return Array.from({length: 10000}, () => (faker.lorem.sentences()));
    },[]);

    const listData: ListItem[] = Array.from({length: 10000}, (_, index) => ({
        index,
        text: mock[index],
    }));
  
    const estimateHeight = 100;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [itemPositions, setItemPositions] = useState<ItemPosition[]>([]);
    const [visibleData, setVisibleData] = useState<ListItem[]>([]);
    const [phantomHeight, setPhantomHeight] = useState(0);
    const [startOffset, setStartOffset] = useState(0);
    const [visibleInfo, setVisibleInfo] = useState<{ startIndex: number; endIndex: number; count: number }>({startIndex: 0, endIndex: 0, count: 0});

    const updateVisibleItems = useCallback(() => {
        if (!containerRef.current) return;
    
        const height = containerRef.current.clientHeight;
        const count = Math.ceil(height / estimateHeight);
    
        setVisibleInfo((info) => {
            const startIndex = info.startIndex;
            const endIndex = startIndex + count;
            return {...info, count, endIndex};
        });

        setVisibleData(listData.slice(visibleInfo.startIndex, visibleInfo.endIndex));
    }, [listData]);

    useEffect(() => {
        const phantomHeight = listData.length * estimateHeight;
        setPhantomHeight(phantomHeight);
    
        const positions = listData.map((_, index) => ({
            index,
            top: index * estimateHeight,
            bottom: (index + 1) * estimateHeight,
            height: estimateHeight,
        }));
    
        setItemPositions(positions);
        updateVisibleItems();
    }, []);

    const updateItemPositions = () => {
        const updatedPositions = [...itemPositions]; // 创建一个副本
        itemRefs.current.forEach((item) => {
            if (!item) return;
      
            const id = +item.id;
            const curHeight = item.clientHeight;
            const oldHeight = updatedPositions[id].height;
            const dValue = curHeight - oldHeight;

            if (dValue) {
                updatedPositions[id].height = curHeight;
                updatedPositions[id].bottom += dValue;

                // 更新后续元素的位置
                for (let index = id + 1; index < updatedPositions.length; index++) {
                    updatedPositions[index].top += dValue;
                    updatedPositions[index].bottom += dValue;
                }
            }
        });

        setItemPositions(updatedPositions); // 更新状态
    };

    useEffect(() => {
        const handleScroll = (e: Event) => {
            const target = e.target as HTMLElement;
            const scrollTop = target.scrollTop;
            const startIndex = getStartIndex(scrollTop);
            const endIndex = startIndex + visibleInfo.count + 3;
            setStartOffset(startIndex * estimateHeight);
            setVisibleData(listData.slice(startIndex, endIndex));
            setVisibleInfo((info) => ({...info, startIndex, endIndex}));
        };

        const container = containerRef.current;
        container?.addEventListener('scroll', handleScroll);
    
        return () => container?.removeEventListener('scroll', handleScroll);
    }, [visibleInfo.count, listData]);

    const getStartIndex = (scrollTop: number): number => {
        let start = 0;
        let end = listData.length - 1;
        let tempIndex: number | null = null;

        while (start <= end) {
            const midIndex = Math.floor((end + start) / 2);
            const midBottom = itemPositions[midIndex]?.bottom;

            if (midBottom === scrollTop) {
                tempIndex = midIndex + 1;
                return tempIndex;
            } else if (midBottom < scrollTop) {
                start = midIndex + 1;
            } else {
                if (tempIndex === null || tempIndex > midIndex) {
                    tempIndex = midIndex;
                }
                end = midIndex - 1;
            }
        }
        return tempIndex || 0; // 返回初始索引
    };

    useEffect(() => {
        updateItemPositions();
    }, [itemRefs.current]);

    return (
        <div ref={containerRef} className="container" style={{height: '400px', overflowY: 'auto'}}>
            <div className="phantom" style={{height: `${phantomHeight}px`}}></div>
            <div className="content" style={{transform: `translate3d(0, ${startOffset}px, 0)`}}>
                {visibleData.map(item => (
                    <div key={item.index} className="content-item" id={item.index.toString()} ref={el => itemRefs.current[item.index] = el}>
                        {item.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

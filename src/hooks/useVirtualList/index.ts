import {useEffect, useMemo, useState} from 'react';

// 定义虚拟列表的参数接口
interface VirtualListOptions {
    // 容器元素引用
    containerTarget: React.MutableRefObject<HTMLElement | null>;
    // 列表包裹元素的引用
    wrapperTarget: React.MutableRefObject<HTMLElement | null>;
    // 单个列表项的高度
    itemHeight: number;
    // 为了减少js计算带来的白屏的影响，设置预渲染元素的数量，默认为5
    overScan: number;
}

interface VirtualListItem<T> {
    // 在原始列表中的索引
    index: number;
    //  对应的数据
    data:T;
}

export function useVirtualList<T>(originalList: T[],options: VirtualListOptions){
    const {containerTarget , wrapperTarget , itemHeight ,overScan = 5} = options;
    const [visibleList,setVisibleList] = useState<VirtualListItem<T>[]>(originalList.slice(0, 10).map((data, index) => ({
        index,
        data,
    })) || []);
    // totalHeight 总高度 
    const totalHeight = useMemo(() => originalList.length * itemHeight,[originalList]);
    // scrollTop 滚动位置
    // 计算 可视区域第一个渲染的列表项在 整个长列表的索引值
    const getOffset = (scrollTop: number) => Math.floor(scrollTop / itemHeight) + 1;
    // 上边距
    const getDistanceTop = (index: number) => index * itemHeight;
    // 列表容器容量
    const getVisibleCount = (containerHeight: number) => Math.ceil(containerHeight / itemHeight);
    // 列表包裹元素样式
    const [wrapperStyle, setWrapperStyle] = useState<any>();
    
    const updateList = () => {
        if (containerTarget.current){
            // 1. 监听container滚动，并根据当前的滚动位置，以及overScan的预加载量计算可见的列表item
            const {scrollTop, clientHeight} = containerTarget.current;
            // 偏移量
            const offset = getOffset(scrollTop);
            // 可见列表数量
            const visibleCount = getVisibleCount(clientHeight);
            // 上下额外多渲染几个 item，解决滚动时来不及加载元素出现短暂的空白区域的问题
            const startIndex = Math.max(0,offset,overScan);
            const endIndex = Math.min(originalList.length, offset + visibleCount + overScan);
            
            // 获取上部高度
            const offsetTop = getDistanceTop(startIndex);

            setWrapperStyle({
                height:totalHeight - offsetTop + 'px', // 设置高度
                marginTop: offsetTop + 'px' // 设置上边距
            });

            const list = originalList.slice(startIndex,endIndex).map((item,index) => ({data: item,index:index + startIndex}));
            setVisibleList(list);
        }
    };

    useEffect(
        ()=>{
            if (!containerTarget.current || !wrapperTarget.current)return;
            const container = containerTarget.current;
            container.addEventListener('scroll',updateList);
            return () => container.removeEventListener('scroll',updateList);
        }
        ,[containerTarget, wrapperTarget, originalList, itemHeight]
    );
    
    // 挂载后更新一次 确保高度正确
    useEffect(() => updateList,[]);

    // 当样式更新后，同步更新列表包裹元素的样式
    useEffect(
        () => {
            if (wrapperTarget.current){
                // @ts-expect-error object key typical error
                Object.keys(wrapperStyle).forEach((key) => ((wrapperTarget.current).style[key]) = wrapperStyle[key]);
            }
              
        }
        ,[]
    );

    // 返回当前可见列表
    return [visibleList];
}
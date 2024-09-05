import React,{useRef, useMemo} from 'react';
import {useVirtualList} from './index';

export default function Demo() {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const originalList = useMemo(() => Array.from(Array(99999).keys()), []);
    const [list] = useVirtualList(originalList, {
        containerTarget: containerRef,
        wrapperTarget: wrapperRef,
        itemHeight: 60, // 下方div的height与marginBottom总和
        overScan: 5,
    });

    return (
        <>
            <div ref={containerRef} style={{height: '300px', overflow: 'auto', border: '1px solid'}}>
                <div ref={wrapperRef}>
                    {list.map((ele) => (
                        <div key={ele.index} style={{height: 52, marginBottom: 8}}>
                            Row: {ele.data}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );    
}


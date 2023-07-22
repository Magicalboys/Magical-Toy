import React, { useEffect, useRef, useState } from "react";
import "./index.css";
export const Count = () => {
  const timer = useRef<any>(0); // 缓存 定时器
  const [time, setTime] = useState(0);
  const [able, setAble] = useState(true); // 禁用 恢复按钮
  const [clock, setClock] = useState("00:00:00");
  const [isRecover, setRecover] = useState(true); //  
  

  const stop = () => {
    if (timer) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setAble(false);
  };

  const recover = () => {

    setAble(true);
    
    setRecover((isRecover)=>!isRecover)
    
    console.log(isRecover)
  };

  // 格式化字符串
  function formatTime(s: number) {
    let hours = Math.floor(s / 3600); // 计算小时数
    let minutes = Math.floor((s % 3600) / 60); // 计算分钟数
    let seconds = s % 60; // 计算剩余秒数
    // 补充前导 0 
    let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  }

  useEffect(() => {
    if (time && time > 0) {
      timer.current = setTimeout(() => {
        // 更新时间
        // setTime((time) => time - 1);
        setTime( time - 1);
        // 格式化字符串
        setClock(formatTime(time));
      }, 1000);
    }
    // 清除定时器
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, [time,isRecover]);

  return (
    <div>
      <div className="btn">
        <button onClick={(e) => setTime(3600)}> 开始 </button>
        <button onClick={(e) => stop()}> 暂停 </button>
        <button onClick={(e) => recover()} disabled={able}>
          恢复
        </button>
      </div>
      <div className="time">
        <h1>{clock}</h1>
      </div>
    </div>
  );
};

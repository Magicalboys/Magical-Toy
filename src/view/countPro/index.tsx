import React, {useState, useEffect, useRef} from 'react';

interface CountdownProps {
  initialSeconds: number; // 初始秒数
}

const Countdown: React.FC<CountdownProps> = ({initialSeconds}) => {
    const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (intervalRef.current !== null) return; // 如果已经开始，则忽略
        setIsActive(true);
        intervalRef.current = setInterval(() => {
            setSecondsLeft((seconds) => {
                if (seconds > 0) return seconds - 1;
                clearInterval(intervalRef.current as NodeJS.Timeout);
                return 0;
            });
        }, 1000);
    };

    const pauseTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsActive(false);
    };

    const resumeTimer = () => {
        if (secondsLeft > 0 && !isActive) {
            startTimer();
        }
    };

    const resetTimer = () => {
        pauseTimer();
        setSecondsLeft(initialSeconds);
    };

    // 清理interval以防止内存泄漏
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div>
            <h1>{formatTime(secondsLeft)}</h1>
            <button onClick={startTimer} disabled={isActive}>
        开始
            </button>
            <button onClick={pauseTimer} disabled={!isActive}>
        暂停
            </button>
            <button onClick={resumeTimer} disabled={isActive}>
        恢复
            </button>
            <button onClick={resetTimer}>重置</button>
        </div>
    );
};

export default Countdown;

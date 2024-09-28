function a() {
    console.log('执行a函数');
}
function b() {
    while (true) { } // 无限循环阻塞了整个js执行线程的继续执行，a函数永远得不到执行
}
b();

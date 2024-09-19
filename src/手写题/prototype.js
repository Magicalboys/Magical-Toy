
Function.prototype.a = ()=>{
    console.log(1);
};

Object.prototype.b = () => {
    console.log(2);
};
// eslint-disable-next-line @typescript-eslint/no-empty-function
function A() {}

const a = new A();

A.a();// 1
A.b();// 2
a.a();//
a.b();// 2

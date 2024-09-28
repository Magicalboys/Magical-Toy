// function render(template, context) {
//     return template.replace(
//       /\{\{(.*?)\}\}/g,
//       (match, key) => 
//           context[key.trim()]
//       );
// }
// //   function (replacement) 一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。
//   const template = "{{name   }}很厉name害，才{{age   }}岁";
//   const context = { name: "jawil", age: "15" };
//   console.log(render(template, context));


const stringRender = (template,context) => {
    return template.replace(
        /\{\{(.*?)\}\}/g,
        (match,key) => {
            context[key]
        }
    )
}




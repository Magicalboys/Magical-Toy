// HardMan("jack") 输出:
// I am jack

// HardMan("jack").rest(10).learn("computer") 输出
// I am jack
// //等待10秒
// Start learning after 10 seconds
// Learning computer

// HardMan("jack").restFirst(5).learn("chinese") 输出
// //等待5秒
// Start learning after 5 seconds
// I am jack
// Learning chinese function HardMan(name) {
// function HardMan(name) {
//     this.queue = [];
//     this.name = name;
//     this.queue.push(() => {
//       console.log(this.name);
//       this.next();
//     });
//   }
      
//   HardMan.prototype.rest = function(time) {
//     const fun = () => {
//       setTimeout(() => {
//         const restStr = 'Start learning after ' + time + ' seconds';
//         console.log(restStr);
//         this.next();
//       }, time * 1000);
//     };
//     this.queue.push(fun);
//     return this;
//   };
      
//   HardMan.prototype.restFirst = function(time) {
//     const fun = () => {
//       setTimeout(() => {
//         const restStr = 'Start learning after ' + time + ' seconds';
//         console.log(restStr);
//         this.next();
//       }, time * 1000);
//     };
//     this.queue.unshift(fun);
//     return this;
//   };
      
//   HardMan.prototype.learn = function(subject) {
//     const fun = () => {
//       const learnStr = 'Learning ' + subject;
//       console.log(learnStr);
//       this.next();
//     };
//     this.queue.push(fun);
//     this.next();
//     return this;
//   };
      
//   HardMan.prototype.next = function() {
//     if (this.queue.length === 0) return;
//     const fun = this.queue.shift();
//     fun();
//     return this;
//   };
      
//   function hardMan(name) {
//     return new HardMan(name);
//   }

    
hardMan('jack');
// hardMan("jack").rest(10).learn("computer")
hardMan('jack').restFirst(5).learn('chinese'); 
      
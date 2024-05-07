// class EvenBus {

//     constructor (){
//         this.events = {};
//     }
    
//     on(eventName,event){
//         this.events[eventName] = this.events[eventName] ?? [];    
//         this.events[eventName].push(event);
//     }

//     off(eventName,event){
//         if(this.events[eventName]){
//             const index = this.events[eventName].indexOf(event);
//             if (index > -1){
//                 this.events[eventName].splice(index,1);
//             }
//         }
//     }

//     emit(eventName,arg) {
//         const events = this.events[eventName] ?? [];
//         events.map(event => event(arg));
//     }

//     once(eventName,event){
//         this.on(eventName, (...arg) => {
//             event(...arg);
//             this.off(eventName,event)
//         })
//     }
// }

class EventBus{
    constructor(){
        this.event = {};
    }
    emit(eventName){
        if (this.event[eventName]){
            this.event[eventName].forEach(eve => eve());
        }
    }
    on(eventName,callback){
        this.event[eventName] = this.event[eventName] ?? [];
        this.event[eventName].push(callback)
    }
    off(eventName,callback){
        if (this.event[eventName]){
            const index = this.event[eventName].indexOf(callback);
            if(index > -1){
                 this.event[eventName].splice(index,1);
            }
        }
    }
    once(eventName, callback){
        this.on(eventName,() => {
            callback(),
            this.off(eventName,callback)
        })
    }

}
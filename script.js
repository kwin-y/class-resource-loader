//mock service
function requestResources(shouldFail) { 
    return new Promise((resolve, reject) => { 
        setTimeout(() => { 
        if (shouldFail) { 
            reject(new Error("Resources could not be loaded.")); 
            return; 
        } 
 
            resolve([ 
            { title: "JavaScript Events", minutes: 15 }, 
            { title: "Closures Practice", minutes: 20 }, 
            { title: "Promises and Await", minutes: 25 } 
            ]); 
        }, 1200); 
    }); 
}

//counter
function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

//2 independent counters
const attemptCounter = makeCounter();
const responseCounter = makeCounter();

//Resource class - parent class
class Resource {
    constructor(title){
        this.title = title;
    }

    describe() {
        return this.title;
    }
}

//Timed Resource class - child class
class TimedResource extends Resource {
    constructor(title, minutes){
        super(title);
        this.minutes = minutes;
    }

    describe() {
        return `${super.describe()} | ${this.minutes} min`;
    }
}
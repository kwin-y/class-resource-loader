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

//html elements that let javascript communicate
const form = document.querySelector("#resourceForm");
const failNext = document.querySelector("#failNext");
const loadButton = document.querySelector("#loadButton");
const attemptsDisplay = document.querySelector("#attempts");
const status = document.querySelector("#status");
const resourceList = document.querySelector("#resourceList");
const pingButton = document.querySelector("#pingButton");
const pingsDisplay = document.querySelector("#pings");
const trace = document.querySelector("#trace");

//busy flag
let busy = false;

//log() function to log messages to the trace element
function log(message) {
    trace.textContent += message + "\n";
}
//submit event listener
form.addEventListener("submit", async function (event) { //whenever form is submitted, this function will run
    event.preventDefault();

    if (busy) {
        return;
    }

    busy = true;
    loadButton.disabled = true;

    const capturedMode = failNext.checked; //capture the state of the checkbox at the time of submission
    attemptsDisplay.textContent = attemptCounter(); //increment and display the number of attempts

    status.textContent = "Loading resources...";

    trace.textContent = "";

    log("A: handler starts");

    setTimeout(() => {
        log("D: timer task");
    }, 0);

    Promise.resolve().then(() => {
        log("C: promise microtask");
    });

    log("B: before await");

     try {
    const data = await requestResources(capturedMode);

    const resources = data.map(item => {
      return new TimedResource(item.title, item.minutes);
    });

    resourceList.textContent = "";

    resources.forEach(resource => {
      const row = document.createElement("li");
      row.textContent = resource.describe();
      resourceList.appendChild(row);
    });

    status.textContent = "Loaded 3 resources";
        log("E: success");
    } catch (error) {
        resourceList.textContent = "";
        status.textContent = error.message;
        log("E: failure");
    } finally {
    busy = false;
        loadButton.disabled = false;
            log("F: cleanup");
    }

});

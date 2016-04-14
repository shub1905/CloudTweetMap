var Worker = require('webworker-threads').Worker;
 
// You may also pass in a function: 
var worker = new Worker(function(){
  postMessage("I'm working before postMessage('ali').");
  this.onmessage = function(event) {
    postMessage('Hi ' + event.data);
    // self.close();
  };
});
worker.onmessage = function(event) {
  console.log("Worker said : " + event.data);
};



function worker_call(msg) {
	worker.postMessage(msg);
}

module.exports.call = worker_call;
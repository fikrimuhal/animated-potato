export const guid =  function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + s4() + s4() +
    s4() +  s4() + s4() + s4();
}



export  const bindFunctions = function bindFunctions(functions) {
  //console.log("bindFunctions: " , functions)
  functions.forEach(f => this[f] = this[f].bind(this));
}



export const myToast = (stateKey,setState,state)=>(message,duration) => {
  var toastSettings  = state[stateKey];
  toastSettings.open=true;
  toastSettings.message=message;
  setState({
    [stateKey]:toastSettings
  });
 setTimeout(function () {
   toastSettings.open=close;
   setState({
     [stateKey] : toastSettings
  });
  },duration);
}

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


export const myToast = (stateKey,component)=>(message,duration) => {
  var toastSettings  = component.state[stateKey];
  toastSettings.open=true;
  toastSettings.message=message;
  component.state[stateKey] = toastSettings;
  component.forceUpdate();
 setTimeout(function () {
   toastSettings.open=false;
   component.state[stateKey] = toastSettings;
   component.forceUpdate();
  },duration);
}

export const obj2Array = function obj2Array(obj) {
  var arr = Object.keys(obj).map((key) => {
    return obj[key];
  });
  return arr;
}

export const setToken = function setToken(token) {
  localStorage.setItem("token",token);
}
export const getToken = function getToken() {
  return localStorage.getItem("token");
}

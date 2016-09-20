import colors from './material-colors'
export const guid = function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + s4() + s4() +
        s4() + s4() + s4() + s4();
}

export const bindFunctions = function bindFunctions(functions) {
    //console.log("bindFunctions: " , functions)
    functions.forEach(f => this[f] = this[f].bind(this));
}

export const myToast = (stateKey, component)=>(message, duration) => {
    var toastSettings = component.state[stateKey];
    toastSettings.open = true;
    toastSettings.message = message;
    component.state[stateKey] = toastSettings;
    component.forceUpdate();
    setTimeout(function () {
        toastSettings.open = false;
        component.state[stateKey] = toastSettings;
        component.forceUpdate();
    }, duration);
}

export const obj2Array = function obj2Array(obj) {
    var arr = Object.keys(obj).map((key) => {
        return obj[key];
    });
    return arr;
}

export const setToken = function setToken(token) {
    localStorage.setItem("token", token);
}
export const getToken = function getToken() {
    return localStorage.getItem("token");
}

export const isNumeric = function (value) {
    return !isNaN(value);
};


var last3color = [];
export const generateColor = ()=> {
    var randomsColorKeys = ["red", "pink", "purple", "blue", "blueGrey", "teal", "green", "yellow", "orange","brown","indigo"];
    var randomColorKey = randomsColorKeys[Math.floor(Math.random() * (randomsColorKeys.length - 1))];
    var color = colors[randomColorKey];
     //console.log("last3color -> color",last3color,randomColorKey);

    if (last3color.length < 4 && !last3color.includes(randomColorKey)) {
        last3color.push(randomColorKey);
        return {
            dark: color.x400,
            light: color.x700
        }
    }
    else {
        if(last3color.includes(randomColorKey)){
            //console.log("rerandom");
             return generateColor();
        }
        else{
            last3color.shift();
            last3color.push(randomColorKey);
            return {
                dark: color.x400,
                light: color.x700
            };
        }
    }
};
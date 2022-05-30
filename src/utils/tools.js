let timeout = null;
 function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

const deepClone=(source,target={})=>{
    if (getType(source) != "Array" && getType(source) != "Object") return source;
    target = getType(source) == "Array" ? [] : {};
    for (let key of Object.keys(source)) {
        if(!target[key]){
            target[key] = deepClone(source[key]);
        }else{
            target[key]=source[key]
        }
       
    }
    return target;
}


const debounce=(fn, wait)=> {
    if (timeout) {
        clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
        fn()
    }, wait) 
}

export default {
    deepClone,
    debounce
}



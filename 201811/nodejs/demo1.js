function deepClone(obj) {
    if (typeof obj !== 'object')
        return obj;
    if (obj == null)
        return null;
    if (obj instanceof Date)
        return new Date(obj);
    if (obj instanceof RegExp)
        return new RegExp(obj);
    var o = new obj.constructor();
    for (var key in obj) {
        o[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
    }
    return o;
}
var x = deepClone({a:1,b:2});
console.log(x);
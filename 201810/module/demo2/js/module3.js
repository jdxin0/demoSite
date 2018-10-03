function mod3_fn1() {
    console.log("mod3-fn1");
}

function mod3_fn2() {
    console.log("mod3-fn2");
}

exports.a = mod3_fn1;
exports.b = mod3_fn2;

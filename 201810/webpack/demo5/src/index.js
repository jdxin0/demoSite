/*global app*/
var mod1 = require('./mod1.js');
var mod2 = require('./mod2.js');
var mod3 = require('./mod3.js');
var mod4 = require('./mod4.js');
window.app = {
    init: function () {
        this.loadFn();
        this.setText();
        this.setStyle();
        this.printDataA();
        this.printDataB();
    },
    data: {
        a: 1,
        b: 2
    },
    loadFn: function () {
        for (var key in this.methods) {
            this[key] = this.methods[key];
        }
    },
    methods: {
        setText: mod1.setText,
        setStyle: mod2.setStyle,
        printDataA: mod3.printDataA,
        printDataB: mod4.printDataB
    }
};
app.init();
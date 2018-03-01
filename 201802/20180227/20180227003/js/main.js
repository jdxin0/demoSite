require.config({
	shim: {
        'js/1.js': {
            exports: 'a'
        },
        'js/2.js': {
            exports: 'b'
        },
        'js/3.js': {
            exports: 'c'
        }
    }
});
require(["js/1.js","js/2.js","js/3.js","js/4.js"],function(mod1,mod2,mod3,mod4){
	console.log(arguments);
	console.log(a,b,c,mod4(),mod4.Hi());
})
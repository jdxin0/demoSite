;(function(a, b) {
    if (a == b) {
        var f = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        console = {};
        var length = methods.length;
        while (length--) {
            console[methods[length]] = f;
        }
    }
}
)(window.console);
import 'izitoast/dist/css/iziToast.min.css';
var iziToast = require('izitoast/dist/js/iziToast.min.js');
module.exports = {
    err: function (msg) {
        iziToast.error({
            position: 'topRight',
            timeout: 3000,
            message: msg
        });
    },
    suc: function (msg) {
        iziToast.success({
            position: 'topRight',
            timeout: 3000,
            message: msg
        });
    }
};
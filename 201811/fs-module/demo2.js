/*global __dirname*/
var fs = require('fs');
var path = require('path');
const stripJsonComments = require('./demo4');
var filePath = path.resolve(__dirname);
function fileDisplay(filePath) {
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err);
        } else {
            if (files.includes('sftp-config.json')) {
                console.log(`${filePath}\\sftp-config.json`);
                var content = fs.readFileSync(`${filePath}\\sftp-config.json`, 'utf-8');
                var sftpData = stripJsonComments(content,{whitespace:false});
                // var sftpConfig = {};
                // ({
                //     host:sftpConfig.host,
                //     username:sftpConfig.username,
                //     password:sftpConfig.password
                // }=sftpData);
                console.log(sftpData);
            } else {
                if (path.resolve(filePath + '/..') !== filePath) {
                    var upFolder = path.resolve(filePath + '/..');
                    fileDisplay(upFolder);
                }
            }
        }
    });
}

fileDisplay(filePath);
/*global __dirname*/
var fs = require('fs');
var path = require('path');
const stripJsonComments = require('./demo4');
var filePath = path.resolve(__dirname);
var sftpConfig = {};
function fileDisplay(filePath) {
    var files = fs.readdirSync(filePath);
    if (files.includes('sftp-config.json')) {
        console.log(`${filePath}\\sftp-config.json`);
        var content = fs.readFileSync(`${filePath}\\sftp-config.json`, 'utf-8');
        var sftpData = stripJsonComments(content,{whitespace:false});
        sftpData = JSON.parse(sftpData);
        ({
            host:sftpConfig.host,
            user:sftpConfig.user,
            password:sftpConfig.password
        }=sftpData);
    } else {
        if (path.resolve(filePath + '/..') !== filePath) {
            var upFolder = path.resolve(filePath + '/..');
            fileDisplay(upFolder);
        }
    }
}

fileDisplay(filePath);
console.log(sftpConfig);
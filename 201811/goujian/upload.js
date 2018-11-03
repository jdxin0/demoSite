client.scp(config.projectPath, {
    host: '10.10.45.12',
    username: 'devweb',
    password: 'I48OJ34Y',
    path: '/usr/local/zeus/htdocs/act.vip.xunlei.com/' + config.clientFolder + '/vip/2018/' + config.projectFolder
}, function () {
    console.log(chalk[getColor()].bold(`已上传服务器:${new Date()}`));
});
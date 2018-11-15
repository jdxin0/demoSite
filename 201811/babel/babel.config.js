/*global process*/
module.exports = function(api) {
    api.cache(false);
    const presets = [
        [
            '@babel/env',
            {
                targets: {
                    browsers: 'ie > 8'
                },
                useBuiltIns: 'usage'
            },
        ],
    ];
    const plugins = [];
    if (process.env['ENV'] === 'prod') {
        console.log('production mode');
        plugins.push();
    }
    return {
        presets,
        plugins
    };
};

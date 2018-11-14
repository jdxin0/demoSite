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

    return {
        presets,
        plugins
    };
};

module.exports = {
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    browsers: 'ie > 8'
                },
                useBuiltIns: 'usage'
            },
        ],
    ]
};

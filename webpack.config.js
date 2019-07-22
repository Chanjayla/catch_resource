const path = require('path');

module.exports = env => {
    let extraPlugin = [];
    if(env.NODE_ENV === 'sprite') {     
        const spriteConfig = require('./build/csssprite');
        extraPlugin = extraPlugin.concat(spriteConfig);
    }
    return {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname,'dist')
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    use: [
                        'file-loader'
                    ]
                },
                {
                    test: /\.vue$/,
                    use: [
                        'vue-loader'
                    ]
                }
            ]
        },
        plugins: [
            
        ].concat(extraPlugin)
    }
}

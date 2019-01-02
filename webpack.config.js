const path = require('path');

module.exports = {
    entry: [
        path.resolve(__dirname, './src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: 'signin.min.js'
    },
    devServer: {
        headers: { 'Access-Control-Allow-Origin': '*' },
        publicPath: '/build/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
};

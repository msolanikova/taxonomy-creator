const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index.jsx'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/i,
                use: ["css-loader"],
            },
        ]
    },
    resolve: {
        extensions: ['*','.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: 'bundle.js',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, './public'),
            publicPath: '/',
        },
        compress: false,
        port: 3000,
    },
    devtool: "eval-source-map"
};

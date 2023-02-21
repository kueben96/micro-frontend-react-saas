const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js'
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.scss|\.css$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader'],
            },
            // loader: tell webpack to process different files as we import them to the project
            {
                // anytime we import a file that ends with .mjs oder .js we want it to be processed by babble
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },
    plugins: [new VueLoaderPlugin()]
}
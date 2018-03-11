module.exports = {
    entry: './src/js/main.js',
    output: {
        path: __dirname+'/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        }
    }
}
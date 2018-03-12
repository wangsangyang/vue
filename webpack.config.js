module.exports = {
    entry: './src/entry.js',
    output: {
        path: __dirname+'/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,//小于10k的都打包成base64
                            name: 'images/[name]_[hash:8].[ext]',//大于于10k的都生成images文件夹下面的hash名字的图片
                            publicPath: '../dist'//打包后html的图片路径错误，通过单独设置publicPath解决这个问题
                        }
                    }
                ]
            },
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
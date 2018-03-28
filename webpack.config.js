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
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                loader: 'url-loader?limit=1000000'
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: require.resolve('jquery'),
                /*loader: 'expose-loader?$!expose-loader?jquery!expose-loader?jQuery', //第二种引用jQuery插件的方法*/
                use: [
                    {
                        loader: 'expose-loader',
                        options: '$'
                    },
                    {
                        loader: 'expose-loader',
                        options: 'jquery'
                    },
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }
                ]
            },
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            muicss: __dirname+'/static/mui/css/mui.min.css',
            mui: __dirname+'/static/mui/js/mui.min.js',
            wui: __dirname+'/static/js/wui.js',
        },
    },
/*    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery'
        }),
    ]*/
}
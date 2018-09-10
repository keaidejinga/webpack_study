module.exports = {
    devtool:'eval-source-map',
    //唯一的入口文件
    entry: __dirname + '/app/main.js',
    //打包之后的文件该输出到哪个位置
    output:{
        path: __dirname + '/public',
        filename:'bulid_main.js'
    },
//devServe 2.9.5启动自带热更新
//    并且它会监测所依赖的模块是否修改
//    我们update code =>
    devServer:{
        // 本地服务器 所加载的页面所在的目录
        contentBase:'./public',
        //服务器端口
        port:'8888',
        //自动刷新
        // inline:true

    },
    module:{
        rules:[
            {
                //必须要有  一个用以匹配loaders所处理文件的扩展名的正则表达式
                test:/\.js$/,
                //后面配置的是loader的名称
                use:'babel-loader',
                //include/exclude 必须处理的文件和需要屏蔽的文件
                exclude:'/node_modules/'
            },
        //    安装style-loader
            {

                test:/\.css$/,
                //配置多个loader时候 use=>value是数组
                //如果没有额外配置 直接string
                //如果有额外配置 为json对象
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                             //把css当成模块=>json对象来看到
                             modules:true,//指定启用css modules
                            localIdentName:'[name]_[local]--[hash:base64:5]'
                        },

                    }
                ]
            },
        //    打包图片 file-loader/url-loader
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                //配置 url-loader的可选项
                use: [
                    {
                        loader: 'url-loader',
                        // 配置 url-loader 的可选项
                        options: {
                            // 限制 图片大小 10000B，小于限制会将图片转换为
                            // base64格式
                            limit: 10000,
                            // 超出限制，创建的文件格式
                            // build/images/[图片名].[hash].[图片格式]
                            name: 'images/[name].[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    }
}
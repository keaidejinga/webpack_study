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

    }
}
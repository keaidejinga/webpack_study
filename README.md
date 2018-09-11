# webpack_study
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
1.什么是webpack
    Webpack=>模块打包机
    它可以做什么事情呢:分析你的项目结构 找到JavaScript模块以及其他一些浏览器不能直接运行的扩展语言
    例如(less) 并将其转换和打包为合适的格式供浏览器使用
2.为什么使用webpack
    把js,css,img等(模块)打包;减少请求
3.安装我们webpack
    还是通过npm去下载webpack
    那么第一步该用什么命令
    npm init =>package.json
    那么第二步 安装webpack
    ====>全局安装(不推荐=>原因=>框架更新太快)

    npm i(install) -g webpack@(版本号)3.5.6

    ====>局部安装(推荐) --save-dev 开发的模式去使用

    npm i --save-dev webpack@(版本号)3.5.6
4.用终端命令 实现webpack打包(webpack模块)(入口)(出口)
    node_modules\.bin\webpack app\main.js public\build_main.js

    用终端操作终归不好管理
    那么webpack提供了一个配置文件
    名字叫做 webpack.config.js(规定)

    然后可以直接使用 node_modules\.bin\webpack
    来进行打包=>他会收缩是否存在webpack.config.js
    那么 node_modules\.bin\webpack=>还是很长
    能不能简单好记一点呢

    在package.json 里面的script这个对象
    是一个自定义指令的位置
    我们可以简化命令实现打包

    npm直接key是有限制的

<!--access, adduser, bin, bugs, c, cache, completion, config,
ddp, dedupe, deprecate, dist-tag, docs, doctor, edit,
explore, get, help, help-search, i, init, install,
install-test, it, link, list, ln, login, logout, ls,
outdated, owner, pack, ping, prefix, profile, prune,
publish, rb, rebuild, repo, restart, root, run, run-script,
s, se, search, set, shrinkwrap, star, stars, start, stop, t,
team, test, token, tst, un, uninstall, unpublish, unstar,
up, update, v, version, view, whoami
-->
    如果不是npm自带的关键字 那么你需要=>npm run key

    webpack的强大功能 调试更简单
    source maps
    打包之后的文件如果配置了source maps可以看到依赖的模块代码

    ====>到底在哪里去配置呢
    webpack.config.js
    devtool:'eval-source-map'
    <!--eval-source-map  偏中小型的一种-->
    使用eval打包源文件模块,在同一个文件中生成一个干净完整的source maps.
    这个选项可以在不影响构建速度的前提下生成完整的sourcemap
    但是对打包后输入的JS文件的执行具有性能和安全的隐患,
    在开发阶段这是一个非常好的选项,在生产阶段则一定
    不要启用这个选项

    对小到中型的项目中,eval-source-map是一个很好的选项
    ,再次强调你只应该开发阶段使用它,我们继续对上文新建的
    webpack.config.js进行如下配置

<!--module.exports = {
    devtool:'eval-source-map',
    //唯一的入口文件
    entry: __dirname + '/app/main.js',
    //打包之后的文件该输出到哪个位置
    output:{
        path: __dirname + '/public',
        filename:'bulid_main.js'
    }
}-->


    代码热更新<=>创建自己的开发测试服务器
    webpack提供一个本地开发服务器,这个服务器是基于node.js
    不过这个模块需要下载并且依赖一下
    npm i --save-dev webpack-dev-server

    webpack-dev-server=>3.0以上版本=>4.0服务的

    webpack又一强大功能
    --loaders==>通过使用不同的loader,webpack有能力调用外部的工具和模块,
    实现对不同格式的文件的处理,比如说吧es6=>es5;转化成现代浏览器兼容的js文件

    ===>因为babel一直就是干这个的,不能抢人家饭碗
    ===>下载babel的处理模块包

babel的安装和配置

    babel的三个核心模块
    babel-loader ====>让webpack知道babel如何运行
    babel-core ====>让babel知道如何解析代码
    babel-preset-env ====>可以根据不同的环境转换代码


    npm i --save-dev babel-loader babel-core babel-preset-env

    babel-loader ===>es6 进行转义 ==>(前端的export与export default规范)

    对css进行打包



<!--插件-->

    要使用某个插件，我们需要通过npm安装它，然后要做的就是在webpack配置
    中的plugins关键字部分添加该插件的一个实例（plugins是一个数组）

1.HtmlWebpackPlugin=>依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html
    安装命令:npm install --save-dev html-webpack-plugin
    (1)移除public文件夹，利用此插件，index.html文件会自动生成，此外CSS已经通过前面的操作打包到JS中了。
    (2)在app目录下，创建一个index.tmpl.html文件模板，这个模板包含title等必须元素，在编译过程中，插件会依据此模板生成最终的html页面，会自动添加所依赖的 css, js，favicon等文件
    (3)更新webpack的配置文件，方法同上,新建一个build文件夹用来存放最终的输出文件
    代码如下
<!--plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        })
    ],
-->

    此时次执行npm start会发现，build文件夹下面生成了bundle.js和index.html。
2.UglifyJsPlugin=>压缩js代码
    安装命令:cnpm i --save-dev uglify-js-plugin
    更新配置文件
    <!--
       在plugins里面加上:
        new webpack.optimize.UglifyJsPlugin(),
        -->
    此时执行npm start 会看到压缩后的代码
3.ExtractTextPlugin=>分离CSS
    安装命令:cnpm install --save-dev extract-text-webpack-plugin

<!--
    在配置文件里引用:
    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    在plugins里面加上:
        new ExtractTextPlugin("style.css")
-->


插件的版本号
<!--
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.1",
    "babel-preset-env": "^1.7.0",
    "babel-preset-es2015": "^6.24.1",
    "clean-webpack-plugin": "^0.1.19",
    "css-loader": "^1.0.0",
    "extract-text-webpack-plugin": "^3.0.2",
    "file-loader": "^2.0.0",
    "html-webpack-plugin": "^3.2.0",
    "style-loader": "^0.23.0",
    "uglify-js-plugin": "^0.0.6",
    "url-loader": "^1.1.1",
    "webpack": "^3.5.6"
    -->




</body>
</html>

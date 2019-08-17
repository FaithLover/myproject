const path = require('path')
const webpack = require('webpack') //启动热键的第二步

//生成内存中HTML页面的插件
//只要是插件都放到plugins节点中
// 这个插件的作用:
// 	1.自动根据指定的页面生成一个内存的页面
// 	2.自动,把打包好的bundle.js 追加到页面中去
const webpackHtmlPlugin = require('html-webpack-plugin')
module.exports = {
	entry:path.join(__dirname,'./src/main.js'),
	output:{
		path:path.join(__dirname,'./dist'),
		filename:'bundle.js'
	},
	devServer:{
		open:true, //自动打开新的浏览窗口
		port:3000, //设置打开的端口号
		// contentBase:'src', //指文件托管的根目录
		hot:true //启动热键的第一步
	},
	plugins:[ //启动热键的第三步
		new webpack.HotModuleReplacementPlugin(),
		new webpackHtmlPlugin({
			template:path.join(__dirname,'./src/index.html'), //根据指定的根目录页面路径，去生成内存中的页面
		filename:'index.html'	//所生成的页面名称
		})
	],
	module:{
		rules:[
			{test:/\.css$/, use:['style-loader','css-loader']},
			{test:/\.less$/, use:['style-loader','css-loader','less-loader']},
			{test:/\.scss$/, use:['style-loader','css-loader','sass-loader']},
			{test:/\.(jpg|png|gif|bmp|jpeg)$/, use:'url-loader?limit=128534&name=[hash:8]-[name].[ext]'},
			{test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},
			{test:/\.js$/, use:'babel-loader', exclude:/node_modules/},
			{test: /\.vue$/,use:'vue-loader'}
		]
	},
	resolve:{
		alias:{
			// "vue$":"vue/dist/vue.js"
		}
	}
}
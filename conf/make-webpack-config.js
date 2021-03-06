var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
function extractForProduction(loaders){
    return ExtractTextPlugin.extract('style',loaders.substr(loaders.indexOf('!')));
}

module.exports = function (options){
    options.ip = options.ip || 'localhost';
    options.lint = fs.existsSync(path.resolve(__dirname,'..','.eslintrc')) && options.lint !== false;

    var localIdentName = options.production ? '[hash:base64]' : '[path]-[local]-[hash:base64:5]';
    var cssLoaders = 'style!css?module&localIdentName=' + localIdentName + '!postcss?browsers=last 2 versions';
    var scssLoaders = cssLoaders + '!sass';
    var sassLoaders = scssLoaders + '?indentedSyntax=sass';
    var lessLoaders = cssLoaders + '!less';

    if(options.production) {
        cssLoaders = extractForProduction(cssLoaders);
        sassLoaders = extractForProduction(sassLoaders);
        scssLoaders = extractForProduction(scssLoaders);
        lessLoaders = extractForProduction(lessLoaders);
    }

    return {
        entry:options.production ? './app/src/main.js' : [
            'webpack-dev-server/client?http://' + options.ip + ':8081',
            'webpack/hot/only-dev-server',
            './app/src/main.js',
        ],
        debug:!options.production,
        devtool:options.devtool,
        output:{
            path:options.production ? './dist' : './build',
            publicPath:options.production ? '' : 'http://' + options.ip + ':8081/',
            filename:options.production ? 'app.[hash].js' : 'app.js',
        },
        module:{
            preLoaders:options.lint ? [
                {
                    test:/\.js$/,
                    exclude:/node_modules/,
                    loader:'eslint',
                },
            ] : [],
            loaders:[
                {
                    test:/\.js$/,
                    exclude:/node_modules/,
                    loaders:['babel'],
                },
                {
                    test:/\.css$/,
                    loader:cssLoaders,
                },
                {
                    test:/\.sass$/,
                    loader:sassLoaders,
                },
                {
                    test:/\.scss$/,
                    loader:scssLoaders,
                },
                {
                    test:/\.less$/,
                    loader:lessLoaders,
                },
                {
                    test:/\.gif$/,
                    loader:'url?limit=100000&mimetype=image/gif',
                },
                {
                    test:/\.png$/,
                    loader:'url?limit=100000&mimetype=image/png',
                },
                {
                    test:/\.svg$/,
                    loader:'url?limit=100000&mimetype=image/svg+xml',
                },
                // {
                //     test:/\.jpg$/,
                //     loader:"url-loader?mimetype=image/jpeg"
                // },
                {
                    test:/\.woff$/,
                    loader:'file',
                },
                {
                    test:/\.eot$/,
                    loader:'file',
                },
                {
                    test:/\.woff2$/,
                    loader:'file',
                },
                {
                    test:/\.ttf$/,
                    loader:'file',
                },
                {
                    test:/\.jpg$/,
                    loader:'file',
                }
                // ,
                //
                // {
                //   test: /\.(jpe?g|png|gif|svg)$/i,
                //   loaders: [
                //     'file?hash=sha512&digest=hex&name=[hash].[ext]',
                //     'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                //   ]
                // }
            ],
        },
        resolve:{
            extensions:['','.js','.sass','.scss','.less','.css','.jpg'],
            unsafeCache:true
        },
        plugins:options.production ? [
            new DashboardPlugin(),
            // Important to keep React file size down
            new webpack.DefinePlugin({
                'process.env':{
                    'NODE_ENV':JSON.stringify('production'),
                },
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress:{
                    warnings:false,
                },
            }),
            new ExtractTextPlugin('app.[hash].css'),
            new HtmlWebpackPlugin({
                template:'./conf/tmpl.html',
                production:true,
            }),
        ] : [
            new HtmlWebpackPlugin({
                template:'./conf/tmpl.html',
            }),
        ],
        postcss:[autoprefixer],
        externals:{
            'cheerio':'window',
            'react/addons':true,
            'react/lib/ExecutionEnvironment':true,
            'react/lib/ReactContext':true
        }
    };
};

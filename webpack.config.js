/* eslint default-case:0 */
const config = require('./config.js');
const path = require('path');
const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // extracts css into its own file instead of inlining it in js bundle
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// const bootstrapEntryPoints = require('./webpack.bootstrap.config');
// const PurifyCSSPlugin = require('purifycss-webpack');
// ===========================================================================
// CONSTANTS
// ===========================================================================
// const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const THEME_NAME = 'domsters-static-theme';
// set up in host file on OSX for development
const PROXY_TARGET = 'local.webpack-fun.com';

// where is your WP theme?
const themePath = path.resolve(__dirname, `wp/wp-content/themes/${THEME_NAME}`);
const PATHS = {
    src: path.resolve(themePath, 'src'),
    build: path.resolve(themePath, 'dist'),
    modules: path.resolve(__dirname, 'node_modules'),
    base: themePath,
};

// const LOADER_INCLUDES = [PATHS.src];

// ===========================================================================
// SETUP ENV
// ===========================================================================
const ENV = process.env.NODE_ENV === 'production' ? PRODUCTION : DEVELOPMENT;
const isProd = process.env.NODE_ENV === 'production'; // true or false

const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
            loader: 'css-loader',
            options: {
                // optimize css images
                url: true,
                minimize: true,
                importLoaders: 1,
                sourceMap: true,
            },
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
            },
        },
    ],
});

// want to use twitter bootstrap 4?
// const bootstrapConfig = isProd
//   ? bootstrapEntryPoints.prod
//   : bootstrapEntryPoints.dev;

function getEntry(env) {
    const entry = {};
    entry.main = [path.resolve(PATHS.src, 'js/index.js')];
    entry.style = path.resolve(PATHS.src, 'sass/style.scss');
    return entry;
}

const cssConfig = isProd ? cssProd : cssDev;

// ===========================================================================
// CONFIG EXPORT
// ===========================================================================
module.exports = {
    entry: getEntry(ENV),
    output: {
        path: PATHS.build,
        filename: '[name].bundle.js',
        publicPath: PATHS.base,
        sourceMapFilename: '[file].map',
    },
    watch: true,
    module: {
        rules: [{
                test: /\.scss$/,
                use: cssConfig,
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },

            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]?[hash]',
                            publicPath: './img/',
                            outputPath: './img',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                    },
                ],
            },
        ],
    },
    devServer: {
        contentBase: themePath,
        historyApiFallback: true,
        compress: true,
        port: 9000,
        hot: true,
        stats: 'errors-only',
        open: true,
        proxy: {
            '*': {
                'target': config.url,
                'secure': false
            },
            '/': {
                target: config.url,
                secure: false
            }
        },
    },
    devtool: isProd ? 'source-map' : 'inline-source-map',
    plugins: [
        // new ExtractTextPlugin({
        //     filename: '[name].css',
        //     disable: !isProd,
        //     allChunks: true,
        // }),
        new ExtractTextPlugin('style.css'),
        // new ExtractTextPlugin({
        //     filename: (getPath) => {
        //         return getPath('css/[name].css').replace('css/js', 'css');
        //     },
        //     allChunks: true,
        //     disable: !isProd
        // }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new CopyWebpackPlugin([
        //            {from:'./src/img',to:'./dist/img'}
        //        ]),
        new webpack.LoaderOptionsPlugin({
            options: {
                THEME_NAME,
                PROXY_TARGET,
                PATHS,
            }
        }),
        new BrowserSyncPlugin(
            // BrowserSync options
            {
                // browse to http://localhost:3000/ during development
                host: 'localhost',
                port: 3000,
                proxy: config.url,
                files: [{
                    match: [
                        '**/*.php'
                    ],
                    fn: function(event, file) {
                        if (event === "change") {
                            const bs = require('browser-sync').get('bs-webpack-plugin');
                            bs.reload();
                        }
                    }
                }]
            }, {
                reload: false
            })
        // limit css per page
        // new PurifyCSSPlugin({
        //   // Give paths to parse for rules. These should be absolute!
        //   paths: glob.sync(path.join(__dirname, 'src/*.html')),
        //   minimize: true,
        // }),
        // want to use twitter bootstrap 4?
        // new webpack.ProvidePlugin({
        //   $: 'jquery',
        //   jQuery: 'jquery',
        //   Tether: 'tether',
        //   'window.Tether': 'tether',
        //   Popper: 'popper.js',
        //   Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
        //   Button: 'exports-loader?Button!bootstrap/js/dist/button',
        //   Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
        //   Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
        //   Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
        //   Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
        //   Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
        //   Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
        //   Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
        //   Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
        //   Util: 'exports-loader?Util!bootstrap/js/dist/util',
        // }),
    ],
};

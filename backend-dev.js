const path = require('path');
const webpack = require('webpack');
const spawn = require('child_process').spawn;
//const HtmlWebpackPlugin = require('html-webpack-plugin');
var fs = require('fs');
var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
     })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;    
     });

const compiler = webpack({
    // add your webpack configuration here
    entry: './app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "bundle.js",
      //libraryTarget: 'commonjs'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          //exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'es2015', 'stage-2']
            }
          }
        }
      ]
    },
    /*plugins: [
      new HtmlWebpackPlugin({
            title: 'Project Demo',
            hash: true,
            template: './views/index.ejs' // Load a custom template (ejs by default see the FAQ for details)
      })
    ],*/
    node: {
        __dirname: false
    },
    externals: nodeModules,
    target: 'node',
});

const watchConfig = {
    // compiler watch configuration
    // see https://webpack.js.org/configuration/watch/
    aggregateTimeout: 300,
    poll: 1000
};

let serverControl;

compiler.watch(watchConfig, (err, stats) => {
    if (err) {
        console.error(err.stack || err);
        if (err.details) {
            console.error(err.details);
        }
        return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
        info.errors.forEach(message => console.log(message));
        return;
    }

    if (stats.hasWarnings()) {
        info.warnings.forEach(message => console.log(message));
    }

    if (serverControl) {
        serverControl.kill();
    }

    // change filename to the relative path to the bundle created by webpack, if necessary(choose what to run)
    serverControl = spawn('node', [path.resolve(__dirname, 'dist/bundle.js')]);

    serverControl.stdout.on('data', data => console.log(data.toString()));
    serverControl.stderr.on('data', data => console.error(data.toString()));
});

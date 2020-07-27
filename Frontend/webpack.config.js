module.exports = {
    entry: ['babel-polyfill' ,'./src/main.js'],
    output: {
        path: __dirname + '/public/scripts' ,
        filename: 'bundle.js'
    }, 
    devServer: {
        contentBase: __dirname + './pages'
    },
    module: {
        rules: [
           {
               test: /\.js$/,
               exclude: /node_modules/,
               use: {
                   loader: 'babel-loader'
               }
           }
        ],
    },
}
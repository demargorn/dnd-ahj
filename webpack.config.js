const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

const config = {
   entry: path.resolve(__dirname, 'src', 'index.js'),
   output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
   },
   devServer: {
      open: true,
      host: 'localhost',
      port: 9090,
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      new MiniCssExtractPlugin({
         filename: './style.css',
      }),
   ],
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/i,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },
         {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
         },
         {
            test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            type: 'asset',
         },
         {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader',
            options: {
               name: 'public/[name].[ext]',
            },
         },
      ],
   },
};

module.exports = () => {
   if (isProduction) {
      config.mode = 'production';
      config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
   } else {
      config.mode = 'development';
   }
   return config;
};

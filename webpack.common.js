const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = () => {
  return {
    entry: './src/main/index.tsx',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'main-bundle-[fullhash].js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    module: {
      rules: [{
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }]
    },
    plugins: [
      new CleanWebpackPlugin()
    ]
  }
}

import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "node:path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const buildPlugins = () => {
    const plugins: webpack.Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: path.resolve('public', 'index.html'),
            minify: true
        }),
        new MiniCssExtractPlugin({
            filename: 'style-[contenthash:8].css',
        }),
        new webpack.ProgressPlugin()
    ]

    return plugins
}

export { buildPlugins }
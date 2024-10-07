import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const buildModules = () => {
    const modules: webpack.Configuration['module'] = {
        rules: [
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: [
                    {
                        loader:'@svgr/webpack',
                        options: {
                            icon: true
                        }
                    }
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    }

    return modules
}

export { buildModules }
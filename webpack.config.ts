import type {Configuration as DevServerConfig} from 'webpack-dev-server';
import path from "node:path";
import webpack from "webpack";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import {buildPlugins} from "./config/webpack/buildPlugins";
import {buildModules} from "./config/webpack/buildModules";
import {buildResolvers} from "./config/webpack/buildResolvers";

interface WebpackEnvironment {
    port?: number
    mode?: 'development' | 'production'
}

export default (env: WebpackEnvironment) => {
    const cfg: webpack.Configuration = {
        mode: env.mode ?? 'development',
        devtool: 'inline-source-map',
        entry: './src/index.tsx',
        output: {
            path: path.resolve('dist'),
            filename: 'bundle-[contenthash:8].js',
            clean: true
        },
        plugins: buildPlugins(),
        module: buildModules(),
        resolve: buildResolvers(),
        optimization: {
            minimizer: [
                new CssMinimizerPlugin()
            ]
        },
        devServer: {
            port: env.port ?? 3000,
            open: true
        }
    }

    return cfg
}
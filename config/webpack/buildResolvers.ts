import webpack from "webpack";
import path from "node:path";

const buildResolvers = () => {
    const resolvers: webpack.Configuration['resolve'] = {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@src': path.resolve('src'),
            '@comp': path.resolve('src', 'components'),
            '@assets': path.resolve('public', 'assets'),
        }
    }

    return resolvers
}

export { buildResolvers }
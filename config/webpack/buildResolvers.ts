import webpack from "webpack";
import path from "node:path";

const buildResolvers = () => {
    const resolvers: webpack.Configuration['resolve'] = {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            '@src': path.resolve('src'),
            '@comp': path.resolve('src', 'components'),
            '@assets': path.resolve('public', 'assets'),
            '@mui/styled-engine': '@mui/styled-engine-sc',
        }
    }

    return resolvers
}

export { buildResolvers }
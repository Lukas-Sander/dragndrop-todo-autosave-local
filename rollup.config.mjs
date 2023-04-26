import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'script/main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [nodeResolve()]
}
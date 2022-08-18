
const path = require("path");

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, './src/index.ts'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'meta-mapper.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
};

  /*
module.exports = {
    mode: "production",
    output: {
        filename: '[name].min.js',
        path: path.join(__dirname, "dist"),
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: 'meta-mapper',
    },
    entry: { "meta-mapper": "./src/index.ts" },
    resolve: {
        extensions: [".ts"]
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    /node_modules/
                ]
            }
        ]
    },
    externals: [nodeExternals()],
    devtool: "source-map",
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: false,
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
};
*/
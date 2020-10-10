import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve'; // 依赖引用插件
import commonjs from 'rollup-plugin-commonjs'; // commonjs模块转换插件
import babel from "rollup-plugin-babel"; // babel 插件
import {uglify} from "rollup-plugin-uglify";
import {minify} from 'uglify-es';

export default [
    {
        input: './src/index.js',
        output: {
            name: 'ScreenDisplay',
            file: pkg.browser,
            format: 'umd'
        },
        plugins: [
            resolve(),
            commonjs({
                include: "node_modules/**"
            }),
            babel({
                extensions: [".js", ".ts"],
                runtimeHelpers: true,
                exclude: ["node_modules/**"]
            }),
            uglify({}, minify)
        ],
        ignore: [
            "node_modules/**"
        ]
    },
    // {
    //     input: './src/index.js',
    //     output: {
    //         file: pkg.module,
    //         format: "es"
    //     },
    //     plugins: [
    //         resolve(),
    //         commonjs({
    //             include: "node_modules/**"
    //         }),
    //         babel({
    //             extensions: [".js", ".ts"],
    //             runtimeHelpers: true,
    //             exclude: ["node_modules/**"]
    //         })
    //     ]
    // },
    // {
    //     input: './src/index.js',
    //     output: {
    //         file: pkg.main,
    //         format: "cjs"
    //     },
    //     plugins: [
    //         resolve(),
    //         commonjs({
    //             include: "node_modules/**"
    //         }),
    //         babel({
    //             extensions: [".js", ".ts"],
    //             runtimeHelpers: true,
    //             exclude: ["node_modules/**"]
    //         })
    //     ]
    // }
]

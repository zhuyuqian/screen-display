import resolve from 'rollup-plugin-node-resolve'; // 依赖引用插件
import commonjs from 'rollup-plugin-commonjs'; // commonjs模块转换插件
import babel from "rollup-plugin-babel"; // babel 插件
import {uglify} from "rollup-plugin-uglify";
import {minify} from 'uglify-es';

export default [
    {   // "module": "dist/screen-display.esm.js"  esm打包后的代码 import引用
        input: './src/index.js',
        output: {file: 'dist/screen-display.esm.js', format: "es"},
        plugins: [
            resolve(),
            commonjs({
                include: "node_modules/**"
            }),
            babel({
                extensions: [".js", ".ts"],
                runtimeHelpers: true,
                exclude: ["node_modules/**"]
            })
        ]
    },
    {   // "unpkg": "dist/screen-display.min.js"  umd打包后的代码 src引用
        input: "./src/index.js",
        output: {file: 'dist/screen-display.min.js', format: "umd", name: "ScreenDisplay"},
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
        ]
    }
]

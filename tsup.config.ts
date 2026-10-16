import tsup from "tsup";
import { readFile } from 'fs/promises'
import { dirname, resolve } from 'path'

export default tsup.defineConfig({
    entry: ["src/index.ts", "example/worker.ts", "example/index.ts"],
    dts: true,
    noExternal: [/(.*)/],
    esbuildPlugins: [
        {
            name: 'raw-loader',
            setup(build) {
                // 1. 拦截所有以 ?raw 结尾的导入路径
                build.onResolve({ filter: /\?raw$/ }, (args) => {
                    // 去掉 ?raw，返回真实路径，并标记命名空间
                    return {
                        path: resolve(dirname(args.importer), args.path.replace(/\?raw$/, '')),
                        namespace: 'raw',
                    }
                })

                // 2. 读取文件内容，作为文本字符串返回
                build.onLoad({ filter: /.*/, namespace: 'raw' }, async (args) => {
                    const contents = await readFile(args.path, 'utf8')
                    return {
                        contents,
                        loader: 'text', // 关键：告诉 esbuild 这是文本，导出为字符串
                    }
                })
            },
        }
    ],
});

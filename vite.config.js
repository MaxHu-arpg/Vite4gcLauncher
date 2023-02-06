import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {visualizer} from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        visualizer({
            open: true,  //注意这里要设置为true，否则无效
            gzipSize: true,
            brotliSize: true
        })
    ],
    base: './'   //本地打开时再配置
})

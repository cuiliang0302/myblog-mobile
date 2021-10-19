import {defineConfig} from 'vite'
import vue from "@vitejs/plugin-vue";
import ViteComponents, {VantResolver} from 'vite-plugin-components'
import styleImport from 'vite-plugin-style-import';
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
	return {
		resolve: {
			alias: {
				"@": resolve(__dirname, "src")
			}
		},
		plugins: [
			vue(),
			ViteComponents({
				customComponentResolvers: [
					VantResolver()
				]
			}),
			styleImport({
				libs: [
					{
						libraryName: 'vant',
						esModule: true,
						resolveStyle: (name) => `vant/es/${name}/style`,
					},
				],
			})
		],
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "./src/assets/style/variable.scss";'
				}
			}
		},
		build: {
			terserOptions: {
				compress: {
					//生产环境时移除console
					drop_console: true,
					drop_debugger: true,
				},
			},
		}
	}
})


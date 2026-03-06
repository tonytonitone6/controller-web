import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		svgr({
			svgrOptions: {
				plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
				svgoConfig: {
					plugins: [
						{
							name: 'preset-default',
							params: {
								overrides: {
									removeViewBox: false,
									removeUnknownsAndDefaults: false,
								},
							},
						},
						{
							name: 'convertColors',
							params: {
								currentColor: true,
							},
						},
					],
				},
			},
		}),
	],
	resolve: {
		alias: {
			'@component': '/src/components',
		},
	},
});

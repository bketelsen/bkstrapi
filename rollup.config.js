import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import alias from 'rollup-plugin-alias';
import path from 'path';
import json from '@rollup/plugin-json';



const onwarn = (warning, onwarn) =>
  (warning.code === 'CIRCULAR_DEPENDENCY' &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);

const mode = process.env.NODE_ENV;
const tracking_id = process.env.TRACKING_ID;

const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const preprocess = sveltePreprocess({
   transformers: {
      scss: { sourceMap: false },
      postcss: { plugins: [ autoprefixer ] }
   }
});

const aliasconfig = {
   resolve: ['.js', '.mjs', '.html', '.svelte'],
   entries:[{
      find:'~',
      replacement: path.join(__dirname, './src')
   }]
};

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		plugins: [
			replace({
				'process.browser': true,
				'process.env.TRACKING_ID': JSON.stringify(tracking_id),
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				dev,
				hydratable: true,
				emitCss: true,
            preprocess
			}),
      resolve({ preferBuiltins: true, mainFields: ['browser'] }),
			commonjs(),
         alias(aliasconfig),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
				exclude: ['node_modules/@babel/**'],
				presets: [['@babel/preset-env']],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true
					}]
				]
			}),

			!dev && terser({
				module: true,
            numWorkers: 1
			})
		],
    onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		plugins: [
			replace({
				'process.browser': false,
				'process.env.TRACKING_ID': JSON.stringify(tracking_id),
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			svelte({
				generate: 'ssr',
				dev,
            preprocess
			}),
			resolve(),
			commonjs(),
			json(),
         alias(aliasconfig),
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),
    onwarn,
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.TRACKING_ID': JSON.stringify(tracking_id),
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			commonjs(),
         alias(aliasconfig),
			!dev && terser({numWorkers: 1})
		],
    onwarn,
	}
};

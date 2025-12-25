import browserslistToEsbuild from 'browserslist-to-esbuild';

const config = {
  entryPoints: ['./src/index.js'],
  tsconfig: './tsconfig.json',
  bundle: true,
  format: 'iife',
  charset: 'utf8',
  target: browserslistToEsbuild(),
};

export default config;

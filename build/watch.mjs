import esbuild from 'esbuild';
import config from './config.mjs';
import { metadata, metadataDev } from './metadata.mjs';

const filename = metadata.match(/@downloadURL.+?([^/]+)\.user\.js/)[1];

(async () => {
  const ctx = await esbuild.context({
    ...config,
    banner: {
      js: metadataDev,
    },
    outfile: `./dist/${filename}.dev.user.js`,
    minify: false,
    loader: {
      '.css': 'text',
    },
  });

  await ctx.watch();
})();

export {};

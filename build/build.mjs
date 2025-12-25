import fs from 'fs';
import esbuild from 'esbuild';

import { metadata, metadataDev, loader } from './metadata.mjs';

const filename = metadata.match(/@downloadURL.+?([^/]+)\.user\.js/)[1];
fs.writeFileSync(`./dist/${filename}.meta.js`, metadata);
fs.writeFileSync(`./dist/${filename}.dev.meta.js`, metadataDev);
fs.writeFileSync(`./dist/${filename}.loader.user.js`, loader);

import config from './config.mjs';

esbuild.build({
  ...config,
  banner: {
    js: metadataDev,
  },
  outfile: `./dist/${filename}.dev.user.js`,
  minify: false,
  plugins: [cssPlugin()],
});

esbuild.build({
  ...config,
  banner: {
    js: metadata,
  },
  outfile: `./dist/${filename}.user.js`,
  minify: true,
  plugins: [cssPlugin()],
});

function cssPlugin() {
  return {
    name: 'css',
    setup(build) {
      const { minify, target } = build.initialOptions;
      build.onLoad({ filter: /\.css$/, namespace: 'file' }, async (args) => {
        const result = await esbuild.build({
          minify,
          target,
          entryPoints: [args.path],
          write: false,
        });
        const minifiedCSS = result.outputFiles[0];
        return {
          loader: 'text',
          contents: minifiedCSS.contents,
        };
      });
    },
  };
}

export {};

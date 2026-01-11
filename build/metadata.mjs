import packageJson from '../package.json' with { type: 'json' };

function createMetadata(additional) {
  return `// ==UserScript==
// @name         Hentai Heroes Penta Drill Sim
// @namespace    https://github.com/rena-jp/${packageJson.name}
// @version      ${packageJson.version}
// @description  ${packageJson.description}
// @author       ${packageJson.author}
// @match        https://*.hentaiheroes.com/*
// @match        https://nutaku.haremheroes.com/*
// @match        https://*.gayharem.com/*
// @match        https://*.comixharem.com/*
// @match        https://*.pornstarharem.com/*
// @match        https://*.transpornstarharem.com/*
// @match        https://*.gaypornstarharem.com/*
// @match        https://*.mangarpg.com/*
// @grant        GM.getValue
// @grant        GM.setValue
// @run-at       document-body
${additional.trim()}
// ==/UserScript==
`;
}

export const metadata = createMetadata(`
// @updateURL    https://raw.githubusercontent.com/rena-jp/${packageJson.name}/main/dist/${packageJson.name}.meta.js
// @downloadURL  https://raw.githubusercontent.com/rena-jp/${packageJson.name}/main/dist/${packageJson.name}.user.js
`);

export const metadataDev = createMetadata(`
// @updateURL    https://raw.githubusercontent.com/rena-jp/${packageJson.name}/main/dist/${packageJson.name}.dev.meta.js
// @downloadURL  https://raw.githubusercontent.com/rena-jp/${packageJson.name}/main/dist/${packageJson.name}.dev.user.js
`);

export const loader = createMetadata(`
// @require      file:///D:/git/${packageJson.name}/dist/${packageJson.name}.dev.user.js
`);

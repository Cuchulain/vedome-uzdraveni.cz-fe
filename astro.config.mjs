// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/** Workaround: Vite 7 load-fallback incorrectly tries to open virtual module IDs as files. */
const virtualModuleGuard = {
  name: 'virtual-module-guard',
  enforce: /** @type {'pre'} */ ('pre'),
  load(id) {
    if (id.startsWith('\0')) return null;
    return undefined;
  },
};

export default defineConfig({
  site: 'https://vedome-uzdraveni.cz',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [virtualModuleGuard, tailwindcss()],
  },
  redirects: {
    // Old WordPress URL redirects (301)
    '/jake-nase-setkani-uzdravenim/': '/novinky/jake-bylo-nase-setkani-s-uzdravenim',
    '/lecitelum-platit-neplatit/': '/novinky/lecitelum-platit-neplatit',
    '/berou-nam-pravo-zdravi/': '/novinky/berou-nam-pravo-zdravi',
    '/pomuze-kniha-vyresit-psychicke-problemy/': '/novinky/pomuze-kniha-vyresit-psychicke-problemy',
    '/14-mesicu-uplynulo-od-chvile-kdy-jsem-se-vylecil/': '/novinky/14-mesicu-uplynulo',
    '/vedome-uzdraveni/': '/',
    '/prihlaseni-je-potvrzeno/': '/prihlaseni-potvrzeno',
    '/ziskat-knihu-magie-vedomeho-uzdraveni/': '/magie-vedomeho-uzdraveni',
    '/prectete-si-knihu/': '/clenova-sekce',
    '/dekuji-vasi-objednavku/': '/dekuji',
  },
});
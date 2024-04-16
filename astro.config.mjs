import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [svelte()],

  redirects: {
    'src/pages/a': 'src/pages/b',
  },

});
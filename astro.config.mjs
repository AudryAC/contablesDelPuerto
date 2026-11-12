import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

export default defineConfig({
  site: 'https://contablesdelpuerto.com',
  integrations: [icon()],
  build: {
    inlineStylesheets: 'always',
  },
});
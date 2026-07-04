import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';

import { tanstackStart } from '@tanstack/react-start/plugin/vite';

import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig, type Plugin } from 'vite';

function tablerIconsTransform(): Plugin {
  const TABLER_ICON_RE = /@tabler\/icons-react/;
  const IMPORT_RE =
    /import\s+\{([^}]+)\}\s+from\s+['"]@tabler\/icons-react['"];?\n?/g;
  return {
    name: 'tabler-icons-transform',
    transform(code) {
      if (!TABLER_ICON_RE.test(code)) return;
      return {
        code: code.replace(IMPORT_RE, (_match, members) => {
          const icons = members.split(',').map((s: string) => s.trim());
          return icons
            .map(
              (icon: string) =>
                `import ${icon} from '@tabler/icons-react/dist/esm/icons/${icon}.mjs';`,
            )
            .join('\n');
        }),
        map: null,
      };
    },
  };
}

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  build: { sourcemap: true },
  plugins: [
    devtools(),
    nitro({
      rollupConfig: { external: [/^@sentry\//] },
      routeRules: {
        '/assets/**': {
          headers: {
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        },
        '/favicon.ico': {
          headers: { 'Cache-Control': 'public, max-age=86400' },
        },
        '/robots.txt': {
          headers: { 'Cache-Control': 'public, max-age=86400' },
        },
        '/sitemap.xml': {
          headers: { 'Cache-Control': 'public, max-age=86400' },
        },
      },
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    tablerIconsTransform(),
  ],
});

export default config;

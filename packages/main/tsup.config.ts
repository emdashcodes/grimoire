import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    preload: 'src/preload.ts',
  },
  format: ['cjs'],
  target: 'node20',
  platform: 'node',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  external: ['electron'],
  // Output .js instead of .cjs for Electron compatibility
  outExtension: () => ({ js: '.js' }),
});

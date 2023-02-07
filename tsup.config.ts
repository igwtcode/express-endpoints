import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  minify: true,
  splitting: false,
  sourcemap: false,
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  outDir: 'dist',
  platform: 'node',
  target: 'node16',
  tsconfig: 'tsconfig.json',
});

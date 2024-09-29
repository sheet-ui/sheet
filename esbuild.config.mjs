import { build } from "esbuild";

const isProduction = process.env.NODE_ENV === "production";

build({
  entryPoints: ["src/index.tsx"],
  bundle: true,
  outfile: "dist/index.cjs.js",
  platform: "node",
  target: ["es6"],
  format: "cjs",
  external: ["react", "react-dom", "framer-motion"],
  sourcemap: !isProduction,
  minify: isProduction,
  treeShaking: isProduction,
}).catch(() => process.exit(1));

build({
  entryPoints: ["src/index.tsx"],
  bundle: true,
  outfile: "dist/index.esm.js",
  platform: "neutral",
  target: ["es6"],
  format: "esm",
  external: ["react", "react-dom", "framer-motion"],
  sourcemap: !isProduction,
  minify: isProduction,
  treeShaking: isProduction,
}).catch(() => process.exit(1));

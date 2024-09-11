import { build } from "esbuild";

const isProduction = process.env.NODE_ENV === "production";

// Build for CommonJS
build({
	entryPoints: ["src/index.tsx"], // or 'src/index.jsx' if not using TypeScript
	bundle: true,
	outfile: "dist/index.cjs.js",
	platform: "node",
	target: ["es6"], // Target ECMAScript 6
	format: "cjs", // CommonJS format
	external: ["react", "react-dom"], // Don't bundle React and ReactDOM
	sourcemap: !isProduction,
}).catch(() => process.exit(1));

// Build for ESModule
build({
	entryPoints: ["src/index.tsx"],
	bundle: true,
	outfile: "dist/index.esm.js",
	platform: "neutral",
	target: ["es6"],
	format: "esm", // ESModule format
	external: ["react", "react-dom"],
	sourcemap: !isProduction,
}).catch(() => process.exit(1));

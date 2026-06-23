import { build, $ } from "bun";

await build({
    entrypoints: ["./index.ts"],
    external: ["commander", "ts-json-schema-generator", "typescript-json-schema"],
    outdir: "./dist",
    minify: false,
    target: "node",
    banner: "#!/usr/bin/env node",
});

await $`tsc -p tsconfig.lib.json`;

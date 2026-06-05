import { build } from "bun";

await build({
    entrypoints: ["./index.ts"],
    outdir: "./dist",
    minify: false,
    target: "node",
    banner: "#!/usr/bin/env node",
});

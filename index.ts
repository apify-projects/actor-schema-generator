import { Command } from "commander";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import pkg from "./package.json" with { type: "json" };
import { buildDatasetSchema } from "./src/buildDatasetSchema.js";

function innerHandle(e: unknown) {
    if (e instanceof Error) {
        console.error(e.message);
    } else {
        console.error(e);
    }
    process.exit(1);
}

function handleErrors<Fn extends (...args: any[]) => any>(fn: Fn) {
    return (...args: Parameters<Fn>) => {
        try {
            return fn(...args).catch(innerHandle);
        } catch (e) {
            innerHandle(e);
        }
    };
}

function resolveOutputPath(): string {
    const actorJsonPath = resolve(process.cwd(), ".actor", "actor.json");
    if (!existsSync(actorJsonPath)) {
        throw new Error("No .actor/actor.json found in current directory");
    }
    const actorJson = JSON.parse(readFileSync(actorJsonPath, "utf-8"));
    const datasetPath = actorJson?.storages?.dataset;
    if (!datasetPath) {
        throw new Error("No storages.dataset defined in .actor/actor.json");
    }
    return resolve(dirname(actorJsonPath), datasetPath);
}

const program = new Command();

program.name("actor-schema-generator");
program.version(pkg.version);
program.description(
    "Generate Apify actor schemas from TypeScript types",
);

program
    .command("dataset")
    .description("Generate dataset schema from TypeScript types")
    .argument("<path-to-dataset-types>", "Path to the TS file with dataset types")
    .option("-t, --type <target-type>", "Type name in target file", "Dataset")
    .option("-c, --tsconfig <tsconfig-path>", "Path to tsconfig.json", "./tsconfig.json")
    .option("-o, --output-file <file-path>", "Output path (default: from .actor/actor.json)")
    .option("-v, --verify", "Check generated schema matches existing file", false)
    .action(
        handleErrors(
            async (schemaPath: string, options: Record<string, string | boolean>) => {
                const outputPath = options.outputFile
                    ? resolve(String(options.outputFile))
                    : resolveOutputPath();

                const merged = buildDatasetSchema({
                    inputPath: resolve(schemaPath),
                    tsconfig: String(options.tsconfig),
                    type: String(options.type),
                    outputPath,
                });
                const generated = JSON.stringify(merged, null, 4);

                if (options.verify) {
                    if (!existsSync(outputPath)) {
                        console.error(`Schema file not found: ${outputPath}`);
                        process.exit(1);
                    }
                    const onDisk = JSON.parse(readFileSync(outputPath, "utf-8"));
                    if (JSON.stringify(onDisk) !== JSON.stringify(merged)) {
                        console.error("Schema is out of date. Run actor-schema-generator to regenerate.");
                        process.exit(1);
                    }
                    console.log("Schema is up to date.");
                } else {
                    writeFileSync(outputPath, generated + "\n");
                    console.log(`Schema written to ${outputPath}`);
                }
            },
        ),
    );

program.parse();

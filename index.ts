import { Command } from 'commander';
import pkg from "./package.json" with { type: "json" }

function innerHandle(e: unknown) {
    if (e instanceof Error) {
        console.error(e.message);
    } else {
        console.error(e);
    }
    process.exit(1);
}

export function handleErrors<Fn extends (...args: any[]) => any>(fn: Fn) {
    return (...args: Parameters<Fn>) => {
        try {
            return fn(...args).catch(innerHandle);
        } catch (e) {
            innerHandle(e);
        }
    };
}

const program = new Command();

program.name('apify-types-from-schema-generator');
program.version(pkg.version);
program.description("Generate Typescript types from an apify actor's input_schema or dataset_schema");

program
    .command('dataset')
    .description('Generate types from a dataset schema')
    .argument('<path-to-dataset-schema>', 'Path to the dataset schema file')
    .option('-o, --output-file <file-path>', 'Path to the output file, defaults to <path-to-dataset-schema>.ts')
    .option(
        '-v, --verify',
        'Instead of generating the file, check that the file that would be generated matches whats already there',
        false,
    )
    .action(
        handleErrors(async (schemaPath: string, options: Record<string, string>, command: Command) => {
            console.log("schemaPath", schemaPath)
            console.log("options", options)
            console.log("command", command)
        }),
    );

program
    .command('input')
    .description('Generate types from an input schema')
    .argument('<path-to-input-schema>', 'Path to the input schema file')
    .option('-o, --output-file <file-path>', 'Path to the output file, defaults to <path-to-input-schema>.ts')
    .option(
        '-v, --verify',
        'Instead of generating the file, check that the file that would be generated matches whats already there',
        false,
    )
    .action(
        handleErrors(async (schemaPath: string, options: Record<string, string>, command: Command) => {
            console.log("schemaPath", schemaPath)
            console.log("options", options)
            console.log("command", command)
        }),
    );

program.parse();

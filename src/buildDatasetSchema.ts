import { existsSync, readFileSync } from "fs";
import { generateSchema } from "./generate";

export function buildDatasetSchema({
    inputPath,
    tsconfig,
    type,
    outputPath,
}: {
    inputPath: string;
    tsconfig: string;
    type: string;
    outputPath: string;
}): object {
    const { $schema, fields } = generateSchema({ path: inputPath, tsconfig, type }) as {
        $schema: string;
        fields: object;
    };
    const existing = existsSync(outputPath) ? JSON.parse(readFileSync(outputPath, "utf-8")) : {};
    return { ...existing, $schema, fields };
}

import { test, expect } from "bun:test";
import { resolve } from "path";
import { buildDatasetSchema } from "../../src/buildDatasetSchema";
import expected from "../../fixtures/union/target-dataset.json";

test("union types (object | string, array | null, etc.)", () => {
    const result = buildDatasetSchema({
        inputPath: resolve(import.meta.dir, "../../fixtures/union/source-types.ts"),
        tsconfig: resolve(import.meta.dir, "../../tsconfig.json"),
        type: "SearchScraperDatasetItem",
        outputPath: resolve(import.meta.dir, "../../fixtures/union/target-dataset.json"),
    });
    expect(result).toEqual(expected);
});

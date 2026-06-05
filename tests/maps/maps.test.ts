import { test, expect } from "bun:test";
import { resolve } from "path";
import { buildDatasetSchema } from "../../src/buildDatasetSchema";
import expected from "./output.json";

test("PlaceDatasetItem generates correct schema", () => {
    const result = buildDatasetSchema({
        inputPath: resolve(import.meta.dir, "input.ts"),
        tsconfig: resolve(import.meta.dir, "../../tsconfig.json"),
        type: "PlaceDatasetItem",
        outputPath: resolve(import.meta.dir, "output.json"),
    });
    expect(result).toEqual(expected);
});

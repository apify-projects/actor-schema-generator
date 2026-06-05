import { test, expect } from "bun:test";
import { resolve } from "path";
import { generateSchema } from "../../src/generate";
import expected from "./output.json";

test("nullable scalar collapses anyOf to type array", () => {
    const result = generateSchema({
        path: resolve(import.meta.dir, "input.ts"),
        tsconfig: resolve(import.meta.dir, "../../tsconfig.json"),
        type: "Dataset",
    });
    expect(result).toEqual(expected);
});

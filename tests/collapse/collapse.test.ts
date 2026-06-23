import { test, expect } from "bun:test";
import { collapseNullableAnyOf } from "../../src/generate";

test("collapses scalar + null anyOf", () => {
    expect(collapseNullableAnyOf({
        anyOf: [{ type: "string" }, { type: "null" }],
    })).toEqual({ type: ["string", "null"] });
});

test("collapses null-first anyOf", () => {
    expect(collapseNullableAnyOf({
        anyOf: [{ type: "null" }, { type: "number" }],
    })).toEqual({ type: ["number", "null"] });
});

test("collapses object + null anyOf preserving properties", () => {
    expect(collapseNullableAnyOf({
        anyOf: [
            { type: "object", properties: { x: { type: "string" } }, additionalProperties: false },
            { type: "null" },
        ],
    })).toEqual({
        type: ["object", "null"],
        properties: { x: { type: "string" } },
        additionalProperties: false,
    });
});

test("recurses into nested properties", () => {
    expect(collapseNullableAnyOf({
        type: "object",
        properties: {
            name: { anyOf: [{ type: "string" }, { type: "null" }] },
        },
    })).toEqual({
        type: "object",
        properties: {
            name: { type: ["string", "null"] },
        },
    });
});

test("throws on anyOf with more than 2 items", () => {
    expect(() => collapseNullableAnyOf({
        anyOf: [{ type: "string" }, { type: "number" }, { type: "null" }],
    })).toThrow("Unsupported anyOf with 3 items");
});

test("collapses anyOf with no null variant", () => {
    expect(collapseNullableAnyOf({
        anyOf: [{ type: "string" }, { type: "number" }],
    })).toEqual({ type: ["string", "number"] });
});

test("leaves anyOf with both object and array unchanged", () => {
    const input = {
        anyOf: [{ type: "object", additionalProperties: {} }, { type: "array", items: { type: "string" } }],
    };
    expect(collapseNullableAnyOf(input)).toEqual(input);
});

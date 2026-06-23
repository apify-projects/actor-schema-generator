import { createGenerator } from "ts-json-schema-generator";

const APIFY_DATASET_SCHEMA = "https://apify.com/schemas/v1/dataset.json";

export type SchemaNode = Record<string, unknown>;

export function collapseNullableAnyOf(node: SchemaNode): SchemaNode {
    if (node.anyOf && Array.isArray(node.anyOf)) {
        const items = node.anyOf as SchemaNode[];
        if (items.length > 2)
            throw new Error(`Unsupported anyOf with ${items.length} items`);
        const hasObject = items.some((item) => item.type === "object");
        const hasArray = items.some((item) => item.type === "array");
        if (hasObject && hasArray) {
            console.warn("Unsupported anyOf: object and array types cannot be merged, leaving as anyOf");
            return node;
        }

        const { anyOf, ...rest } = node;
        const types: unknown[] = [];
        const mergedProps: SchemaNode = {};
        let hasNull = false;

        for (const item of items) {
            const { type, ...itemRest } = item;
            if (type === "null") {
                hasNull = true;
            } else if (Array.isArray(type)) {
                for (const t of type) t === "null" ? (hasNull = true) : types.push(t);
            } else {
                types.push(type);
            }
            Object.assign(mergedProps, itemRest);
        }
        if (hasNull) types.push("null");

        return { ...rest, ...mergedProps, type: types };
    }

    const result: SchemaNode = {};
    for (const [key, val] of Object.entries(node)) {
        if (val && typeof val === "object" && !Array.isArray(val)) {
            result[key] = collapseNullableAnyOf(val as SchemaNode);
        } else if (Array.isArray(val)) {
            result[key] = val.map((item) =>
                item && typeof item === "object" && !Array.isArray(item)
                    ? collapseNullableAnyOf(item as SchemaNode)
                    : item,
            );
        } else {
            result[key] = val;
        }
    }
    return result;
}

export function generateSchema({
    path,
    tsconfig,
    type,
}: {
    path: string;
    tsconfig: string;
    type: string;
}): object {
    const generator = createGenerator({
        path,
        tsconfig,
        expose: "none",
        topRef: false,
        encodeRefs: false,
        additionalProperties: true,
        skipTypeCheck: true,
    });

    const { $id, $schema, definitions, ...fields } = generator.createSchema(
        type,
    ) as Record<string, unknown>;
    return {
        $schema: APIFY_DATASET_SCHEMA,
        fields: collapseNullableAnyOf(fields),
    };
}

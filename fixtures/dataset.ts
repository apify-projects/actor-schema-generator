export type Dataset = {
    id: string;
    other: Meme;
    nullableValue?: { nested: string } | null;
};

type Meme = {
    lala: number;
};

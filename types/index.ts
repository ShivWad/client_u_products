
type TCategories = {
    categories: {
        name: string;
        subcategories: string[];
    }[]
};

type TLocations = {
    [state: string]: string[];
}

export type {
    TCategories,
    TLocations
}
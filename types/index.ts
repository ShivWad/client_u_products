
type TCategories = {
    categories: {
        name: string;
        subcategories: string[];
    }[]
};

type TLocations = {
    [state: string]: string[];
}

type TProduct = {
    _id: string,
    name: string,
    ownerId: string,
    category: string,
    subCategory: string,
    city: string,
    images: [string],
    description: string,
    price: number,
    isAvailable: boolean,
    createdAt: string,
    updatedAt: string,
    ownerName: string
}

type TUser = {
    _id?: string,
    name?: string,
    email?: string,
    createdAt?: string,
    isAuthenticated: boolean
}


type TLoginInput = {
    name?: string | null,
    email: string,
    password: string
}

type TAuthObj = {
    status: "FAILED" | "SUCCESS",
    message: string,
    dbCode?: number,
    user?: TUser
}

export type {
    TCategories,
    TLocations,
    TUser,
    TProduct,
    TLoginInput,
    TAuthObj 
}
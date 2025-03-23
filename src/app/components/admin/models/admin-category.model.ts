export interface AdminCategory {
    // categoryId: any;
    id:string;
    quantity:string;
    name: string;
    isActivated: boolean;
    // activated: boolean;

}
export interface AdminCategoryselect {
    // categoryId: any;
    id:string;
    name: string;
    isActivated: boolean;
    // activated: boolean;

}

// patch_______________________________
export interface patchCategory{
    category: menupatch[];
}

export interface menupatch {
    id:string;
    isActivated: boolean;

}
// ____________________________________

// put________________________________

export interface putCategory{
    name: string;
}



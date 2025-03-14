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


export interface patchCategory{
    category: menu[];
}

export interface menu {
    id:string;
    isActivated: boolean;

}

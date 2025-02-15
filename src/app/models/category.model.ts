export interface Category {
    // categoryId: any;
    id:string;
    quantity:string;
    name: string;
    // isActivated: boolean;
    activated: boolean;

}

export interface patchCategory {
    id:string;
    isActivated: boolean;

}

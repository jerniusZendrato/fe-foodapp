

export interface UserAdmin {
    id:string;
    name: number;
    birthday:string;
    role: string;
    user_id: string;
}

export interface changeUserAdmin {
    user_id:string;
    oldPassword: number;
    newPassword:string;
    
}



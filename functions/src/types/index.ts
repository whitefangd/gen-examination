export declare class Paths {
    [key: string]: Actions
}

declare class Actions {
    full_control: boolean
    access: boolean
    read: boolean
    create: boolean
    modify: boolean
    delete: boolean
    execute: boolean
    special_permission: boolean
}
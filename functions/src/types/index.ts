import {DocumentData} from "@google-cloud/firestore"

export declare class Paths {
    [key: string]: Actions
}

export namespace Pojo {
    export declare class PojpPaths implements DocumentData {
        path: string
        groups: Array<string>
        roles: Array<string>
        users: Array<{
            actions: Actions
            uid: string
        }>
    }

    export declare class Roles implements DocumentData {
        actions: Actions
    }
    
}

export declare class Actions {
    full_control: boolean
    access: boolean
    read: boolean
    create: boolean
    modify: boolean
    delete: boolean
    execute: boolean
    special_permission: boolean
}
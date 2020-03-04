declare class TreeItem {
    id: number
    name: string | undefined
    path: string
    children: TreeItem[]
}

export default TreeItem
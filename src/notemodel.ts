export enum NodeType {
    Text, Image, Audio, Video, Portal
}

export class Node {
    type: NodeType;
    content: string;
    posX: number;
    posY: number;
    background: string;
    connections: Node[];
}

export class Map {
    id: number;
    title: string;
    createdAt: Date;
    lastSynced: Date;
    lastModified: Date;
    nodes: Node[];

}

export class Category {
    title: string;
    maps: Map[];
}
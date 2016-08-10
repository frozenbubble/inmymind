export enum NodeType {
    Text, Image, Audio, Video
}

export class Node {
    type: NodeType;
    content: string;
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
    notes: Map[];
}
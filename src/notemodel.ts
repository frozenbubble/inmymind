export enum NodeType {
    Text, Image, Audio, Video, Portal
}

export class Position2D {
    x: number;
    y: number;
}

export class Node {
    type: NodeType;
    content: string;
    position: Position;
    background: string;
    connections: Node[];
}

export class Map {
    id: string;
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
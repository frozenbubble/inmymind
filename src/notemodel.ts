export enum NodeType {
    Text, Image, Audio, Video
}

export class Node {
    type: NodeType;
    content: string;
    connections: Node[];
}

export class Note {
    title: string;
    createdAt: Date;
    lastSynced: Date;
    nodes: Node[];

}

export class Notebook {
    title: string;
    notes: Note[];
}
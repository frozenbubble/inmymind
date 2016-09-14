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
    constructor() {
        this.title = 'New Map';
        this.id = ''; //GUID?!
        this.createdAt = new Date();
        this.lastSynced = new Date();
        this.lastModified = new Date();
        this.nodes = [];
    }

    id: string;
    title: string;
    createdAt: Date;
    lastSynced: Date;
    lastModified: Date;
    nodes: Node[];

}

export class Category {
    constructor() {
        this.title = 'New Category';
        this.maps = [];
    }
    
    title: string;
    maps: Map[];
}

export class Notebook {
    constructor(public title: string) {
        this.categories = [];
    }

    categories: Category[];
}
import { Component, Input, EventEmitter, Output } from 'angular2/core';

import { Node } from './notemodel'

let marked = require('marked');

enum Mode {
    Edit, Object
}

@Component({
    selector: 'node',
    directives: [],
    template: `
        <div class="node" draggable="true" (click)="select($event)"
            (dragstart)="drag($event)" (dragend)="dragend($event)"
            (mouseenter)="showButtons(true)" (mouseleave)="showButtons(false)">

            <div *ngIf="displayButtons" class="buttons" >
                <a (click)="editMode()">edit</a>
                <a (click)="delete()">delete</a>
            </div>

            <div>
                <div class="node-content" [innerHTML]="renderContent()"></div>
            </div>
            
        </div>`
})
export class NodeComponent
{
    @Input() content: Node = new Node();
    @Output() deleteNode = new EventEmitter();

    private displayButtons = false;
    private mode: Mode = Mode.Object;
    private positionCache: any[] = [];
    x: number;
    y: number;    

    drag(event: DragEvent) {
        let style = window.getComputedStyle(event.target as Element, null);
        this.positionCache.push({
            x: parseInt(style.getPropertyValue("left"),10) - event.clientX,
            y: parseInt(style.getPropertyValue("top"),10) - event.clientY
        });
    }

    dragend(event: DragEvent) {
        // too much hassle: node has to know its position anyway...

        let offset = this.positionCache.pop(); //destructuring
        console.log(offset);
        let node = event.target as HTMLDivElement;

        node.style.left = (event.clientX + parseInt(offset.x,10)) + 'px';
        node.style.top = (event.clientY + parseInt(offset.y,10)) + 'px';

        event.preventDefault();
        return false;
    }

    select(event: MouseEvent) {
        console.log(event.pageX); 
        this.content.content = "## woooow";       
    }

    renderContent() {
        return marked(this.content.content);
    }

    showButtons(show: boolean) {
        this.displayButtons = show;
    }

    edit() {
        this.mode = Mode.Edit;
    }

    delete () {

    }

    finishEdit() {
        this.mode = Mode.Object;
    }
}
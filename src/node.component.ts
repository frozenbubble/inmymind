import { Component, Input } from 'angular2/core';

import { Node } from './notemodel'

let marked = require('marked');

@Component({
    selector: 'node',
    template: `
        <div id="node" class="node" draggable="true" (click)="select($event)"
            (dragstart)="drag($event)" (dragend)="dragend($event)" 
            [innerHTML]="renderContent()">
        </div>`
})
export class NodeComponent
{
    @Input() content: Node = new Node();

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
    }

    renderContent() {
        return marked(this.content.content);
    }
}
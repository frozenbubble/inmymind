import { Component } from 'angular2/core';

@Component({
    selector: 'node',
    template: `
        <div id="node" class="node" draggable="true" (click)="select($event)"
            (dragstart)="drag($event)" (dragend)="drop($event)">
            This is a node.
        </div>`
})
export class NodeComponent
{
    private positionCache: any[] = [];

    drag(event: DragEvent) {
        let style = window.getComputedStyle(event.target as Element, null);
        this.positionCache.push({
            x: parseInt(style.getPropertyValue("left"),10) - event.clientX,
            y: parseInt(style.getPropertyValue("top"),10) - event.clientY
        });
        // event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
    }

    drop(event: DragEvent) {
        // too much hassle: node has to know its position anyway...

        //let offset = event.dataTransfer.getData("text/plain").split(',');
        let offset = this.positionCache.pop(); //destructuring
        console.log(offset);
        let node = event.target as HTMLDivElement;//document.getElementById('node');

        node.style.left = (event.clientX + parseInt(offset.x,10)) + 'px';
        node.style.top = (event.clientY + parseInt(offset.y,10)) + 'px';

        event.preventDefault();
        return false;
    }

    select(event: MouseEvent) {
        console.log(event.pageX);
    }
}
import { Component, Input } from 'angular2/core';

import { NodeComponent } from './node.component';
import { Map } from './notemodel'

@Component({
    selector: 'map-editor',
    template: `
        <div class="pane note-content" (drop)="drop($event)" (dragover)="dragover($event)">
            <node *ngFor="let n of map.nodes" [content]="n"></node>
        </div>`,
    directives: [NodeComponent]
})
export class NoteEditorComponent 
{
    @Input() map: Map;
    
    drop(event: DragEvent) {
        event.preventDefault();
        return false;
    }

    dragover() {
        event.preventDefault();
        return false;
    }
}
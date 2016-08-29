import { Component, Input } from '@angular/core';

import { NodeComponent } from './node.component';
import { Map } from './notemodel'
import { NotebookProvider } from './noteprovider.service';

@Component({
    selector: 'map-editor',
    template: `
        <div class="pane note-content" (drop)="drop($event)" (dragover)="dragover($event)">
            <node *ngFor="let n of map.nodes" [content]="n"></node>
        </div>`,
    directives: [NodeComponent],
    providers: [NotebookProvider]
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
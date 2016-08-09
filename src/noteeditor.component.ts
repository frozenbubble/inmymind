import { Component } from 'angular2/core';

import { NodeComponent } from './node.component';

@Component({
    selector: 'note-editor',
    template: `
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="note-content" (drop)="drop($event)" (dragover)="dragover($event)">
                    <node></node>
                </div>
            </div>
        </div>`, 
    directives: [NodeComponent]
})
export class NoteEditorComponent 
{
    drop(event: DragEvent) {
        event.preventDefault();
        return false;
    }

    dragover() {
        event.preventDefault();
        return false;
    }
}
import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';

import { NotePickerComponent } from './notepicker.component';
import { NoteEditorComponent } from './noteeditor.component';
import { NotebookProviderService } from './noteprovider.service';
import { Category, Map, Node } from './notemodel';
import { ToolbarComponent } from './toolbar.component';

@Component({
    selector: 'app',
    directives: [NotePickerComponent, NoteEditorComponent, ToolbarComponent],
    providers: [NotebookProviderService],
    template: `
        <div class="window">
            <toolbar></toolbar>
            
            <div class="window-content">
                <div class="pane-group">
                    <div class="pane-sm sidebar">
                        <notepicker *ngFor="let c of notebook" [category]="c" 
                            (onSelect)="selectMap($event)" [selectedMap]="selectedMap">
                        </notepicker>
                    </div>
                    <div class="pane">
                        <map-editor [map]="selectedMap"></map-editor>
                    </div>
                </div>
            </div>
            
            <!-- <footer class="toolbar-footer imm-footer">
                <h1 class="title">Footer</h1>
            </footer> -->
        </div>`
})
export class AppComponent {
    constructor(private notebookService: NotebookProviderService){
        this.notebook = notebookService.getNotes();
        console.log(this.notebook);
    }

    notebook: Category[];
    selectedMap: Map = new Map();

    selectMap(m: Map) {
        this.selectedMap = m;
    }

}
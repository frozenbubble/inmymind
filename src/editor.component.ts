import { Component, OnInit } from '@angular/core';

import { NotePickerComponent } from './notepicker.component';
import { NewInput } from './newinput.directive'
import { NoteEditorComponent } from './noteeditor.component';
import { NotebookProvider } from './noteprovider.service';
import { Category, Map, Node, Notebook } from './notemodel';
import { ToolbarComponent } from './toolbar.component';
import { NotebookManagerComponent } from './notebookmanager.component'
import { CategoryCreatorComponent } from './categorycreator.component';

@Component({
    selector: 'editor',
    directives: [NotePickerComponent, NoteEditorComponent, ToolbarComponent, NotebookManagerComponent,
        CategoryCreatorComponent, NewInput],
    providers: [NotebookProvider],
    template: `
        <div class="window">
            <toolbar></toolbar>
            <notebook-manager></notebook-manager>

            <div class="window-content">
                <div class="pane-group">
                    <div class="pane-sm sidebar">
                        <category-creator (oncreate)="addCategory($event)"></category-creator>

                        <notepicker *ngFor="let c of notebook.categories" [category]="c" 
                            (onSelect)="selectMap($event)" [selectedMap]="selectedMap">
                        </notepicker>
                    </div>
                    <div class="pane">
                        <map-editor [map]="selectedMap"></map-editor>
                    </div>
                </div>
            </div>
        </div>`
})
export class EditorComponent implements OnInit {
    ngOnInit() {

    }

    constructor(private notebookService: NotebookProvider){
        this.notebook = notebookService.getLastUsedNotebook();
        // console.log(notebook);
        console.log('NOTEBOOK' + this.notebook);
    }

    notebook: Notebook;
    selectedMap: Map = new Map();

    selectMap(m: Map) {
        this.selectedMap = m;
    }

    addCategory(c: Category) {
        this.notebook.categories.push(c);
    }
}
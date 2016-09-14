import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { NotePickerComponent } from './notepicker.component';
import { NewInput } from './newinput.directive'
import { NoteEditorComponent } from './noteeditor.component';
import { NotebookProvider } from './noteprovider.service';
import { Category, Map, Node, Notebook } from './notemodel';
import { ToolbarComponent } from './toolbar.component';
import { NotebookManagerComponent } from './notebookmanager.component'
import { CategoryCreatorComponent } from './categorycreator.component';

const {dialog} = require('electron').remote;

@Component({
    selector: 'editor',
    directives: [NotePickerComponent, NoteEditorComponent, ToolbarComponent, NotebookManagerComponent,
        CategoryCreatorComponent, NewInput],
    providers: [NotebookProvider],
    template: `
        <div class="window">
            <toolbar></toolbar>

            <div class="window-content">
                <div class="pane-group">
                    <div class="pane-sm sidebar">
                        <div *ngIf="notebook">
                            <category-creator (oncreate)="addCategory($event)"></category-creator>

                            <notepicker *ngFor="let c of notebook.categories" [category]="c" 
                                (onSelect)="selectMap($event)" [selectedMap]="selectedMap"
                                (onNewMap)="save()">
                            </notepicker>
                        </div>
                    </div>
                    <div class="pane">
                        <map-editor [map]="selectedMap"></map-editor>
                    </div>
                </div>
            </div>
        </div> -->`
})
export class EditorComponent implements OnInit {
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let notebook = params['notebook'];
            this.notebookService.openNotebook(notebook).then(val => {
                this.notebook = val;
            });
        });
    }

    constructor(private notebookService: NotebookProvider, private route: ActivatedRoute){

    }

    @Input() notebook: Notebook;
    selectedMap: Map = new Map();

    selectMap(m: Map) {
        this.selectedMap = m;
    }

    addCategory(c: Category) {
        this.notebook.categories.push(c);
        this.save();
    }

    save() {
        this.notebookService.save(this.notebook).then(filename => {
            console.log(`notebook saved to: ${filename}`);
        }, reason => {
            // this should be in a separate file along with importing electron remote
            let options = {
                message: reason,
                type: 'error',
                buttons: ['Ok'],
                defaultId: 0
            };

            dialog.showMessageBox(options);
        });
    }
}
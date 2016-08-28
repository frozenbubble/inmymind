import {Component} from '@angular/core';

import { NotePickerComponent } from './notepicker.component';
import { NewInput } from './newinput.directive'
import { NoteEditorComponent } from './noteeditor.component';
import { NotebookProviderService } from './noteprovider.service';
import { Category, Map, Node } from './notemodel';
import { ToolbarComponent } from './toolbar.component';

@Component({
    selector: 'app',
    directives: [NotePickerComponent, NoteEditorComponent, ToolbarComponent, NewInput],
    providers: [NotebookProviderService],
    template: `
        <div class="window">
            <toolbar></toolbar>
            
            <div class="window-content">
                <div class="pane-group">
                    <div class="pane-sm sidebar">
                        
                        <nav class="nav-group">
                            <h5 class="nav-group-title category-title">
                                <span class="icon icon-plus-circled picker-button" (click)="addCategory()"></span>
                                <span *ngIf="!addingCategory">
                                    Add category
                                </span>
                                <span *ngIf="addingCategory">
                                    <input newInput type="text" class="map-name-input" (focusout)="create($event, false)" (keyup.enter)="create($event, true)"/>
                                </span>
                            </h5>
                        </nav>

                        <notepicker *ngFor="let c of notebook" [category]="c" 
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
export class AppComponent {
    constructor(private notebookService: NotebookProviderService){
        this.notebook = notebookService.getNotes();
    }

    notebook: Category[];
    selectedMap: Map = new Map();
    addingCategory: boolean = false;

    selectMap(m: Map) {
        this.selectedMap = m;
    }

    create(event, accept:boolean) {
        this.addingCategory = false;

        if(accept) {
            let c = new Category();
            c.title = event.target.value;
            this.notebook.push(c);
        }
    }

    addCategory() {
        this.addingCategory = true;
    }

}
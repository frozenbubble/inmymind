import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';

import { NotePickerComponent } from './notepicker.component';
import { NoteEditorComponent } from './noteeditor.component';
import { CategoriesComponent } from './categories.component'
import { NotebookProviderService } from './noteprovider.service';
import { Category, Map, Node } from './notemodel';

@Component({
    selector: 'app',
    directives: [NotePickerComponent, NoteEditorComponent, CategoriesComponent],
    providers: [NotebookProviderService],
    template: `
        <categories></categories>
        
        <div id="wrapper">
            <notepicker></notepicker>
            <note-editor></note-editor>
        </div>`
})
export class AppComponent {
    constructor(private notebookService: NotebookProviderService){
        this.notebook = notebookService.getNotes();
        console.log(this.notebook);
    }

    notebook: Category[];

    getAsd() {
        return 0;
    }

}
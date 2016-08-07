import {bootstrap} from 'angular2/platform/browser';
import {Component} from 'angular2/core';

import {NotePickerComponent} from './notepicker.component';
import {NoteEditorComponent} from './noteeditor.component';

@Component({
    selector: 'app',
    directives: [NotePickerComponent, NoteEditorComponent],
    template: `
        <div class="toolbar">
            Toolbar
        </div>

        <div class="categories-tabbar">
            Tabbar
        </div>
        
        <div id="wrapper">
            <notepicker></notepicker>
            <note-editor></note-editor>
        </div>`
})
export class AppComponent {
    constructor(){}

    getAsd() {
        return 0;
    }

}
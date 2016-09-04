import {Component} from '@angular/core';

import { EditorComponent } from './editor.component';

@Component({
    selector: 'app',
    directives: [EditorComponent],
    template: `
        <editor></editor>`
})
export class AppComponent {
    
}
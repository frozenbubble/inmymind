import {Component} from '@angular/core';

import { EditorComponent } from './editor.component';

@Component({
    selector: 'app',
    directives: [EditorComponent],
    template: `
        <router-outlet></router-outlet>`
})
export class AppComponent {
    
}
import { Component } from 'angular2/core';

@Component({
    selector: 'toolbar',
    template: `
        <header class="toolbar-header imm-header">
            <button class="btn btn-default">
                <span class="icon icon-doc-text"></span>
            </button>
        </header>`
})
export class ToolbarComponent {
    
}
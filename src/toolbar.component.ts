import { Component } from '@angular/core';

@Component({
    selector: 'toolbar',
    template: `
        <header class="toolbar-header imm-header">
            <div class="toolbar-actions">
                <button class="btn btn-default">
                    <span class="icon icon-doc-text"></span>
                </button>
            </div>
        </header>`
})
export class ToolbarComponent {
    
}
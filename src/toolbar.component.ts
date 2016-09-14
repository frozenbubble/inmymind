import { Component } from '@angular/core';

@Component({
    selector: 'toolbar',
    template: `
        <header class="toolbar-header imm-header">
            <div class="toolbar-actions">
                <a class="btn btn-default" routerLink="/manager">
                    <span class="icon icon-book"></span>
                </a>

                <div class="btn-group">
                    <button class="btn btn-default">
                        <span class="icon icon-doc-text"></span>
                    </button>

                    <button class="btn btn-default">
                        <span class="icon icon-picture"></span>
                    </button>
                </div>
            </div>
        </header>`
})
export class ToolbarComponent {
    
}
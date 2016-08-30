import { Component, Input } from '@angular/core';
import { NotebookProvider } from './noteprovider.service';
import { Notebook } from './notemodel';

@Component({
    selector: 'notebook-manager',
    template: `
        <div class="modal fade" id="notebookManager" role="dialog">
            <div class="modal-dialog">
        
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Notebooks</h4>
                    </div>
                    <div class="modal-body">
                        <p *ngFor="let nb of notebooks">
                            <span class="icon icon-book"></span>
                            {{nb.title}}
                            <span class="icon icon-trash pull-right"></span>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default pull-left">Create</button>
                        <button type="button" class="btn btn-default pull-left">Open</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`
})
export class NotebookManagerComponent {
    constructor(private notebookProvider: NotebookProvider) {
        this.notebooks = this.notebookProvider.getKnownNotebooks();
    }

    private notebooks: Notebook[];
}
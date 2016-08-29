import { Component, Input } from '@angular/core';
import { NotebookProvider } from './noteprovider.service';

@Component({
    selector: 'notebook-manager',
    template: `
        <div class="modal fade" id="notebookManager" role="dialog">
            <div class="modal-dialog">
        
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Modal Header</h4>
                    </div>
                    <div class="modal-body">
                        <p>Some text in the modal.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`
})
export class NotebookManagerComponent {

}
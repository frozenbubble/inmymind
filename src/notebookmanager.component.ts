import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotebookProvider } from './noteprovider.service';
import { NewInput } from './newinput.directive'
import { Notebook } from './notemodel';

const {dialog} = require('electron').remote;

@Component({
    selector: 'notebook-manager',
    directives: [NewInput],
    template: `
        <div class="text-left back-button" *ngIf="canGoBack">
            <a (click)="goBack()">
                <span class="icon icon-left-circled"></span>
                Editor
            </a>
        </div>

        <div id="manager-container" class="container">
            <div class="page-header">
                <h3>Notebooks</h3>
            </div>

            <div>
                <p *ngFor="let nb of notebooks" class="manager-entry">
                    <span class="icon icon-book"></span>
                    <a (click)="openNotebook(nb)">{{nb}}</a>
                    <a class="pull-right" (click)="removeNotebook(nb)">
                        <span class="icon icon-trash pull-right"></span>
                    </a>
                </p>
                <p *ngIf="addingNotebook">
                    <span class="icon icon-book"></span>
                    <input type="text" class="new-notebook-title" newInput
                     (keyup.enter)="createNotebook($event)" (focusout)="showNotebookInput(false)" />
                </p>
            </div>

            <div class="page-header"></div>

            <div id="manager-footer">
                <a class="btn btn-default pull-left" (click)="showNotebookInput(true)">Create</a>
                <a class="btn btn-default pull-right" (click)="openFolder()">Open folder</a>
            </div>
        </div>`
})
export class NotebookManagerComponent implements OnInit {
    constructor(private notebookProvider: NotebookProvider, private router: Router) {
        this.notebooks = this.notebookProvider.getNotebooks();
    }

    ngOnInit() {
        this.notebookProvider.getLastUsedNotebook().then(val => {
            this.canGoBack = true;
        }, reason => {
            this.canGoBack = false;
        })
    }

    private notebooks: string[];
    private addingNotebook: boolean = false
    private canGoBack: boolean = false;

    @Output() notebookSelected = new EventEmitter<Notebook>();

    openNotebook(title) {
        let link = ['/editor', title];
        this.router.navigate(link);
    }

    removeNotebook(notebook: string) {
        console.log(`attempting to remove: ${notebook}`)
        let buttons = ['Yes', 'No'];

        let options = {
            message: `Are you sure you want to delete ${notebook}?`,
            type: 'question',
            buttons: buttons,
            defaultId: 1
        };

        let response = dialog.showMessageBox(options);
        
        if (buttons[response] === 'Yes') {
            this.notebookProvider.removeNotebook(notebook).then(val => {
                this.notebooks = val;
            }, reason => {
                // error handling
                console.log(`error: reason`);
            });
        }
    }

    showNotebookInput(value: boolean) {
        this.addingNotebook = value;
    }

    createNotebook (event) {
        this.notebookProvider.createNotebook(event.target.value).then(val => {
            this.notebooks = val;
            this.showNotebookInput(false);
        }, reason => {
            console.log(`notebook creation rejected with reason: ${reason}`)
        }).catch(err => console.log(`Error: ${err}`));
    }

    openFolder() {
        this.notebookProvider.openFolder().then(val => {
            this.notebooks = val
            this.canGoBack = false;
        });
    }

    goBack() {
        window.history.back();
    }
}
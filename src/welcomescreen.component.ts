import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotebookProvider } from './noteprovider.service';

@Component({
    selector: 'welcome-screen', 
    template: `<div></div>`
})
export class WelcomeScreenComponent implements OnInit {
    constructor(private router: Router, private notebookService: NotebookProvider) { }

    ngOnInit() {
        this.notebookService.getLastUsedNotebook().then(title => {
            this.router.navigate(['/editor', title]);
        }, reason => {
            console.log(reason);
            this.router.navigate(['/manager'])
    });
    }
}
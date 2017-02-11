import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotebookProvider } from './noteprovider.service';
import { BootstrapperService } from './bootstrapper.service';

@Component({
    selector: 'welcome-screen',
    providers: [BootstrapperService], 
    template: `<div></div>`
})
export class WelcomeScreenComponent implements OnInit {
    constructor(private router: Router, private notebookService: NotebookProvider, private bootsrapperService: BootstrapperService) { }

    ngOnInit() {
        console.log('WelcomeScreenComponent ngOnInit');
        if (this.bootsrapperService.isFirstRun()) {
            console.log('navigating to onboarding');
            this.router.navigate(['/onboarding']);
        }

        else {
            this.notebookService.getLastUsedNotebook().then(title => {
                this.router.navigate(['/editor', title]);
            }, reason => {
                console.log(reason);
                this.router.navigate(['/manager'])
            });
        }
    }
}
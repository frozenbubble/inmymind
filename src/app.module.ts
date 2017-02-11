import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor.component';
import { BootstrapperService } from './bootstrapper.service';
import { NotebookProvider } from './noteprovider.service';
import { NotebookManagerComponent } from './notebookmanager.component';
import { WelcomeScreenComponent } from './welcomescreen.component';
import { OnboardingComponent } from './onboarding.component';
import { routing } from './app.routing';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
    imports: [BrowserModule, routing],
    declarations: [AppComponent, EditorComponent, NotebookManagerComponent, WelcomeScreenComponent, OnboardingComponent],
    providers: [NotebookProvider, BootstrapperService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
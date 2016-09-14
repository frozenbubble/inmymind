import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor.component';
import { NotebookProvider } from './noteprovider.service';
import { NotebookManagerComponent } from './notebookmanager.component';
import { WelcomeScreenComponent } from './welcomescreen.component';
import { routing } from './app.routing';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
    imports: [BrowserModule, routing],
    declarations: [AppComponent, EditorComponent, NotebookManagerComponent, WelcomeScreenComponent],
    providers: [NotebookProvider, {provide: LocationStrategy, useClass: HashLocationStrategy}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
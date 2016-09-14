import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component'
import { NotebookManagerComponent } from './notebookmanager.component'
import { WelcomeScreenComponent } from './welcomescreen.component';

const appRoutes = [
    {
        path:'',
        component: WelcomeScreenComponent
    },
    {
        path: 'editor/:notebook',
        component: EditorComponent
    },
    {
        path: 'manager',
        component: NotebookManagerComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
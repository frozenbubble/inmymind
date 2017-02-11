import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component'
import { NotebookManagerComponent } from './notebookmanager.component'
import { WelcomeScreenComponent } from './welcomescreen.component';
import { OnboardingComponent } from './onboarding.component';

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
    },
    {
        path: 'onboarding',
        component: OnboardingComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
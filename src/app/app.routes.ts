import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        
        path: 'child',
        loadComponent: () => import('./child/child.component').then(m => m.ChildComponent)
    },
    {
        path: 'childa',
        loadComponent: () => import('./child-a/child-a.component').then(m => m.ChildAComponent)
    }
];

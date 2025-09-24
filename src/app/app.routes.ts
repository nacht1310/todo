import { Routes } from '@angular/router';
import { ROUTE } from './common/constant/constant';
import { ErrorNotFound } from './common/component/error-not-found/error-not-found';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTE.TODO_LIST,
  },
  {
    path: ROUTE.PROFILE,
    loadComponent: () => import('./modules/profile/profile.component').then((m) => m.Profile),
  },
  {
    path: ROUTE.TODO_LIST,
    loadComponent: () => import('./modules/todo-list/todo-list.component').then((m) => m.TodoList),
  },
  {
    path: '**',
    component: ErrorNotFound,
  },
];

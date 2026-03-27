import { Routes } from '@angular/router';
import { Page01 } from './page-01/page-01';
import { PageNotFound } from './page-not-found/page-not-found';
import { Page02 } from './page-02/page-02';
import { Page03 } from './page-03/page-03';
import { Page04 } from './page-04/page-04';
import { todosResolver } from './todos-resolver';

export const routes: Routes = [
    {"path":"page01",component:Page01},
    // {"path":"page02",component:Page02},
    {"path":"page02",loadComponent:()=>import('./page-02/page-02').then(c=>c.Page02)},
    {"path":"page03/:firstName",component:Page03},
    {"path":"page04",component:Page04,resolve:{
        todos:todosResolver,
        users:usersResolver
    }},


    {path:"",redirectTo:"/page01",pathMatch:"full"},
    {path:"**",component:PageNotFound}




];

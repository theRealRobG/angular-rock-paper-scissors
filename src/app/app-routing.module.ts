import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainGameComponent, MainMenuComponent } from './components';

const routes: Routes = [
    { path: '', redirectTo: '/main-menu', pathMatch: 'full' },
    { path: 'main-menu', component: MainMenuComponent },
    { path: 'main-game', component: MainGameComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

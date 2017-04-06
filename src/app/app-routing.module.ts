import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainGameComponent, MainMenuComponent, GameOverComponent } from './components';
import { gameOverRouteParam, mainGameRoute, gameOverRoute, mainMenuRoute } from './constants';

const routes: Routes = [
    { path: '', redirectTo: `/${mainMenuRoute}`, pathMatch: 'full' },
    { path: mainMenuRoute, component: MainMenuComponent },
    { path: mainGameRoute, component: MainGameComponent },
    { path: `${gameOverRoute}/:${gameOverRouteParam}`, component: GameOverComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

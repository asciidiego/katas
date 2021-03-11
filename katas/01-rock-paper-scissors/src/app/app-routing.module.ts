import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PlayComponent } from './play/play.component';

const routes: Route[] = [
  {
    path: 'main-menu',
    component: MainMenuComponent,
  },
  {
    path: 'play',
    component: PlayComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main-menu',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

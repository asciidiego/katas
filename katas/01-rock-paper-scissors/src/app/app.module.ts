import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PlayComponent } from './play/play.component';
import { GameStatePresenterPipe } from './game-state-presenter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    PlayComponent,
    GameStatePresenterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

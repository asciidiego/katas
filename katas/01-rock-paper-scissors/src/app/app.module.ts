import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameStatePresenterPipe } from './game-state-presenter.pipe';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PlayComponent } from './play/play.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    PlayComponent,
    GameStatePresenterPipe,
    AboutComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

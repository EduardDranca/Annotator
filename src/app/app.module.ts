import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentViewComponent } from './content-view/content-view.component';
import { GraphicalContainerComponent } from './graphical-container/graphical-container.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentViewComponent,
    GraphicalContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

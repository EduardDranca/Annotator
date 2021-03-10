import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentViewComponent } from './content-view/content-view.component';
import { GraphicalContainerComponent } from './graphical-container/graphical-container.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarSeparatorComponent } from './sidebar-separator/sidebar-separator.component';
import { DirectoryExplorerComponent } from './directory-explorer/directory-explorer.component';
import { FileLabelComponent } from './file-label/file-label.component';
import { LabelExplorerComponent } from './label-explorer/label-explorer.component';
import { AnnotationLabelComponent } from './annotation-label/annotation-label.component';
@NgModule({
  declarations: [
    AppComponent,
    ContentViewComponent,
    GraphicalContainerComponent,
    SidebarComponent,
    SidebarSeparatorComponent,
    DirectoryExplorerComponent,
    FileLabelComponent,
    LabelExplorerComponent,
    AnnotationLabelComponent
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

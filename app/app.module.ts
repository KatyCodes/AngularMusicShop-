import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { AlbumListComponent } from './album-list.component';
import { NewAlbumComponent } from './new-album.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    AlbumListComponent,
    NewAlbumComponent
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }

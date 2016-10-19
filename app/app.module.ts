import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }   from './app.component';
import { AlbumListComponent } from './album-list.component';
import { NewAlbumComponent } from './new-album.component';
import { EditAlbumComponent } from './edit-album.component';
import { GenrePipe } from './genre.pipe';
import { UniqueGenrePipe } from './unique-genre.pipe';
import { SearchPipe } from './search.pipe';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [
    AppComponent,
    AlbumListComponent,
    NewAlbumComponent,
    EditAlbumComponent,
    GenrePipe,
    UniqueGenrePipe,
    SearchPipe
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }

import { Component, Input } from '@angular/core';
import { Album } from './album.model';

@Component({
  selector: 'album-list',
  template: `
  <div *ngFor="let album of childAlbumList">
    <h3>{{album.name}}</h3>
    <h4>{{album.artist}}</h4>
    <h4>{{album.genre}}</h4>
    <h4>\${{album.price}}</h4>
  </div>
  `
})

export class AlbumListComponent {
  @Input() childAlbumList: Album[];

}

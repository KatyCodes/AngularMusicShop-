import { Component } from '@angular/core';
import { Album } from './album.model';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <h1>Angular 2 Music Store</h1>
    <album-list
      [childAlbumList]="masterAlbumList"
    ></album-list>
    <new-album
      (newAlbumSender)="addAlbum($event)"
    ></new-album>
  </div>
  `
})

export class AppComponent {
  public masterAlbumList: Album[] = [
    new Album ("The Doors", "The Doors", 14.95, "Rock"),
    new Album ("Abbey Road", "The Beatles", 9.99, "Rock"),
    new Album ("Green River", "Creedence Clearwater Revival", 12.45, "Rock"),
    new Album ("Like A Prayer", "Madonna", 8.99, "Pop"),
    new Album ("Beethoven Collection", "Beethoven", 18.99, "Classical")
  ];
  addAlbum(newAlbum) {
    this.masterAlbumList.push(newAlbum);
  }
}

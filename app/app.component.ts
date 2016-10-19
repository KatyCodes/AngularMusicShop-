import { Component } from '@angular/core';
import { Album } from './album.model';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <h1>Angular 2 Music Store</h1>
    <div class = "row">
      <div class="col-sm-9">
        <album-list
          [childAlbumList]="masterAlbumList"
          (albumEditSender)="setAlbumToEdit($event)"
          (albumBuySender)="setAlbumToBuy($event)"
        ></album-list>
        <edit-album
          [albumToEdit]="selectedAlbum"
          (doneClickedSender)="finishedEditing()"
        ></edit-album>
        <new-album
          (newAlbumSender)="addAlbum($event)"
        ></new-album>
      </div>
      <div class="col-sm-3">
      <shopping-cart
      [albumsToBuy]="shoppingCart"
      ></shopping-cart>
      </div>
    </div>
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

  public shoppingCart: Album[] = [];

  selectedAlbum: Album = null;

  addAlbum(newAlbum) {
    this.masterAlbumList.push(newAlbum);
  }

  setAlbumToEdit(albumToEdit) {
    this.selectedAlbum = albumToEdit;
  }

  finishedEditing() {
    this.selectedAlbum = null;
  }

  setAlbumToBuy(album) {
    this.shoppingCart.push(album);
  }
}

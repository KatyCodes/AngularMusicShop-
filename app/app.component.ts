import { Component } from '@angular/core';
import { Album } from './album.model';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <navigation
      [childAlbumList]="masterAlbumList"
      (genreDisplaySender)="updateGenreDisplay($event)"
      (searchTermSender)="updateSearchTerm($event)"
    ></navigation>
    <div class = "row">
      <div id="main" class="col-sm-12">
        <album-list
          [childAlbumList]="masterAlbumList"
          [childIsOwner]="isOwner"
          [childGenreDisplay]="genreDisplay"
          [childSearchTerm]="searchTerm"
          [childCartTotal]="cartTotal"
          (albumEditSender)="setAlbumToEdit($event)"
          (albumDeleteSender) = "albumDelete($event)"
          (albumBuySender)="setAlbumToBuy($event)"
        ></album-list>
      </div>
      <div id="cart" class="col-sm-3">
        <shopping-cart
          [albumsToBuy]="shoppingCart"
          [childCartTotal]="cartTotal"
          (removeClickedSender)="deleteFromCart($event)"
          (newCartTotalSender)="updateCartTotal($event)"
          (checkOutSender) = "checkOut()"
        ></shopping-cart>
      </div>
    </div>
    <div class='row'>
      <edit-album
        [albumToEdit]="selectedAlbum"
        [childIsOwner]="isOwner"
        (doneClickedSender)="finishedEditing()"
      ></edit-album>
      <new-album *ngIf="isOwner"
        (newAlbumSender)="addAlbum($event)"
      ></new-album>
    </div>
    <button *ngIf="!isOwner" class='pull-right btn btn-default' (click)="ownerLogin()">Owner Login</button>
    <button *ngIf="isOwner" class='pull-right btn btn-default' (click)="ownerLogout()">Owner Logout</button>
  </div>
  `
})

export class AppComponent {
  public masterAlbumList: Album[] = [
    new Album ("The Doors", "The Doors", 14.95, "Rock", "thedoors.jpg"),
    new Album ("Abbey Road", "The Beatles", 9.99, "Rock", "abbeyroad.jpg"),
    new Album ("Green River", "Creedence Clearwater Revival", 12.45, "Rock", "greenriver.jpg"),
    new Album ("Like A Prayer", "Madonna", 8.99, "Pop", "likeaprayer.jpg"),
    new Album ("Beethoven Collection", "Beethoven", 18.99, "Classical", "beethoven.jpg"),
    new Album ("Thriller", "Michael Jackson", 8.99, "Pop", "thriller.png"),
    new Album ("Back in Black", "AC/DC", 9.99, "Hard Rock", "backinblack.png"),
    new Album ("The Dark Side of the Moon", "Pink Floyd", 17.99, "Rock", "mooon.png")
  ];

  public shoppingCart: Album[] = [];
  public cartTotal: number = 0;
  public selectedAlbum: Album = null;
  public isOwner: boolean = false;
  public genreDisplay: string = "all";
  public searchTerm: string = "";


  addAlbum(newAlbum) {
    this.masterAlbumList.push(newAlbum);
  }

  setAlbumToEdit(albumToEdit) {
    this.selectedAlbum = albumToEdit;
  }

  albumDelete(album) {
    var albumIndex = this.masterAlbumList.indexOf(album);
    this.masterAlbumList.splice(albumIndex, 1);
  }

  finishedEditing() {
    this.selectedAlbum = null;
  }

  setAlbumToBuy(album) {
    album.numberInCart++;
    if (album.numberInCart <= 1) {
      this.shoppingCart.push(album);
    }
    this.cartTotal += album.price;
    this.resizeColumns();
  }

  deleteFromCart(album) {
    var albumIndex = this.shoppingCart.indexOf(album);
    this.shoppingCart.splice(albumIndex,1);
    this.cartTotal -= (album.price * album.numberInCart);
    album.numberInCart = 0;
    this.resizeColumns();
  }

  updateCartTotal(newTotal) {
    this.cartTotal = newTotal;
  }

  checkOut(){
    this.cartTotal= 0;

    for(var i=0; i< this.shoppingCart.length; i++){
      this.shoppingCart[i].numberInCart = 0;
    }
    this.shoppingCart = [];
    this.resizeColumns();
  }

  ownerLogin() {
    this.isOwner = true;
  }

  ownerLogout() {
    this.isOwner = false;
  }

  updateGenreDisplay(genre) {
    this.genreDisplay = genre;
    this.resizeColumns();
  }

  updateSearchTerm(newSearch) {
    this.searchTerm = newSearch;
    this.resizeColumns();
  }

  resizeColumns() {
    if (this.shoppingCart.length === 0) {
      document.getElementById('main').className = 'col-sm-12';
      // var albums = document.getElementsByClassName('albumDisplay');
      // [].forEach.call(albums, function(album) {
      //   album.className = 'albumDisplay col-sm-3';
      // });
    } else {
      document.getElementById('main').className = 'col-sm-9';
      // var albums = document.getElementsByClassName('albumDisplay');
      // [].forEach.call(albums, function(album) {
      //   album.className = 'albumDisplay col-sm-4';
      // });
    }
  }

}

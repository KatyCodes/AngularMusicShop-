import { Component } from '@angular/core';
import { Album } from './album.model';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <div class = "row">
      <div id="main" class="col-sm-12">
        <album-list
          [childAlbumList]="masterAlbumList"
          [childIsOwner] ="isOwner"
          (albumEditSender)="setAlbumToEdit($event)"
          (albumBuySender)="setAlbumToBuy($event)"
        ></album-list>
        <edit-album
          [albumToEdit]="selectedAlbum"
          (doneClickedSender)="finishedEditing()"
        ></edit-album>
        <new-album *ngIf="isOwner"
          (newAlbumSender)="addAlbum($event)"
        ></new-album>
      </div>
      <div id="cart" class="col-sm-3">
        <shopping-cart
          [albumsToBuy]="shoppingCart"
          [childCartTotal]="cartTotal"
          (removeClickedSender)="deleteFromCart($event)"
          (newCartTotalSender)="updateCartTotal($event)"
        ></shopping-cart>
      </div>
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
    new Album ("Beethoven Collection", "Beethoven", 18.99, "Classical", "beethoven.jpg")
  ];

  public shoppingCart: Album[] = [];
  public cartTotal: number = 0;
  public selectedAlbum: Album = null;
  public isOwner: boolean = false;


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
    album.numberInCart++;
    if (album.numberInCart <= 1) {
      this.shoppingCart.push(album);
    }
    this.cartTotal += album.price;
    if (this.shoppingCart.length === 1) {
      document.getElementById('main').className = 'col-sm-9';
      var albums = document.getElementsByClassName('albumDisplay');
      [].forEach.call(albums, function(album) {
        album.className = 'albumDisplay col-sm-4';
      });
    }
  }

  deleteFromCart(album) {
    var albumIndex = this.shoppingCart.indexOf(album);
    this.shoppingCart.splice(albumIndex,1);
    this.cartTotal -= (album.price * album.numberInCart);
    album.numberInCart = 0;
    if (this.shoppingCart.length === 0) {
      document.getElementById('main').className = 'col-sm-12';
      var albums = document.getElementsByClassName('albumDisplay');
      [].forEach.call(albums, function(album) {
        album.className = 'albumDisplay col-sm-3';
      });
    }
  }

  updateCartTotal(newTotal) {
    this.cartTotal = newTotal;
  }

  ownerLogin() {
    this.isOwner = true;
  }

  ownerLogout() {
    this.isOwner = false;
  }
}

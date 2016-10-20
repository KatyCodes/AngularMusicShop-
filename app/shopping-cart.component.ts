import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Album } from './album.model';

@Component ({
  selector: 'shopping-cart',
  template: `
  <div *ngIf="albumsToBuy[0]">
    <h2>Shopping Cart</h2>
    <ul>
      <li *ngFor = "let album of albumsToBuy">
        <h3>{{album.name}}</h3>
        <h4>{{album.artist}}</h4>
        <h4>
          <input (keyup)="updateQuantity(album, $event.target.value)" value="{{album.numberInCart}}" class='form-control'> x \${{album.price}}
        </h4>
        <button (click)="removeClicked(album)">Remove</button>
      </li>
    </ul>
    <h3>Total: <span class='pull-right'>\${{(childCartTotal).toFixed(2)}}</span></h3>
  </div>
  `

})

export class ShoppingCartComponent {
  @Input() albumsToBuy: Album[];
  @Input() childCartTotal: number;
  @Output() removeClickedSender = new EventEmitter();
  @Output() newCartTotalSender = new EventEmitter();

  removeClicked(album){
    this.removeClickedSender.emit(album);
  }

  updateQuantity(album, newQuantity) {
    if (newQuantity == 0) {
      this.removeClickedSender.emit(album);
      album.numberInCart = newQuantity;
    } else {
      album.numberInCart = newQuantity;
      var newCartTotal = 0;
      for (var i = 0; i < this.albumsToBuy.length; i++) {
        newCartTotal += (this.albumsToBuy[i].price * this.albumsToBuy[i].numberInCart);
      }
      this.childCartTotal = newCartTotal;
      this.newCartTotalSender.emit(newCartTotal);
    }
  }
}

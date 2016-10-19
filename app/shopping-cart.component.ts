import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Album } from './album.model';

@Component ({
  selector: 'shopping-cart',
  template: `
  <div >
    <h2 *ngIf="albumsToBuy[0]">Shopping Cart</h2>
    <ul>
      <li *ngFor = "let album of albumsToBuy">
        <h3>{{album.name}}</h3>
        <h4>{{album.artist}}</h4>
        <h4 class='pull-right'>{{album.price}}</h4>
      </li>
    </ul>
  </div>
  `

})

export class ShoppingCartComponent {
  @Input() albumsToBuy: Album[];

}

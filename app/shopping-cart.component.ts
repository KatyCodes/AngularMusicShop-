import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Album } from './album.model';

@Component ({
  selector: 'shopping-cart',
  template: `
  <div class="well" *ngIf="albumsToBuy[0]">
    <h2>Shopping Cart</h2>
    <hr>
    <ul>
      <li class='cartAlbums' *ngFor = "let album of albumsToBuy">
        <img class='cartImage' src='/resources/images/{{album.image}}'>
        <h4>{{album.name}}</h4>
        <p>{{album.artist}}</p>
        <h5>
          <input id="quantityInput" (keyup)="updateQuantity(album, $event.target.value)" value="{{album.numberInCart}}" class='form-control'> x \${{album.price}}
        </h5>
        <button class="btn btn-remove" (click)="removeClicked(album)">Remove</button>
        <hr>
      </li>
    </ul>
    <h3 class='text-center'>Total: \${{(childCartTotal).toFixed(2)}}</h3>
    <button class="btn btn-checkout btn-lg" data-toggle="modal" data-target="#thankYou" (click)="checkOutClicked()">Check out!</button>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="thankYou" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">Thank You!</h4>
        </div>
        <div class="modal-body">
          <p>
            Thank you for your purchase. By supporting <em>Angular 2 Music</em> you are supporting artists and musicians all over the Portland metro area. We appreciate your support... hope to see you again soon!
          </p>
          <p>
            Your albums will arrive within 5-7 business days.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" data-dismiss="modal"class="btn">Ok</button>
        </div>
      </div>
    </div>
  </div>

  `

})

export class ShoppingCartComponent {
  @Input() albumsToBuy: Album[];
  @Input() childCartTotal: number;
  @Output() removeClickedSender = new EventEmitter();
  @Output() newCartTotalSender = new EventEmitter();
  @Output() checkOutSender = new EventEmitter();

  removeClicked(album){
    this.removeClickedSender.emit(album);
  }

  checkOutClicked(){
    this.checkOutSender.emit();
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

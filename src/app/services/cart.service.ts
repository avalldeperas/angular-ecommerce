import { Injectable } from '@angular/core';
import {CartItem} from '../common/cart-item';
import {of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  // Subject is subclass of Observable.
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();


  constructor() { }

  addToCart(cartItem: CartItem){
    console.log(`CartService - addToCart() - CartItem name: ${cartItem.name}, unitPrice: ${cartItem.unitPrice}`);
    let existingCartItem: CartItem;

    for (const tempCartItem of this.cartItems){
      if (tempCartItem.id === cartItem.id) {
        existingCartItem = tempCartItem;
        break;
      }
    }

    existingCartItem !== undefined ? existingCartItem.quantity++ : this.cartItems.push(cartItem);
    this.computeCartTotals();
  }


  private computeCartTotals() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;

    for (const currentCartItem of this.cartItems) {
        totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
        totalQuantityValue += currentCartItem.quantity;
    }

    // publish / send the event to all subscribers
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }


  private logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (const currentCartItem of this.cartItems) {
      const subTotalPrice = currentCartItem.quantity * currentCartItem.unitPrice;
      console.log(`name: ${currentCartItem.name}, quantity: ${currentCartItem.quantity}, unitPrice: ${currentCartItem.unitPrice},
      subTotalPrice: ${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
    console.log("----");
  }
}

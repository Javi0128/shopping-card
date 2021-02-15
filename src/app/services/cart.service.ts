import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {

  id: number;
  name: string;
  price: number;
  amount: number;

}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  data: Product[] = [
    { id: 1, name: "Pizza Salami", price: 8.99, amount: 1 },
    { id: 2, name: "Pizza Classic", price: 5.49, amount: 1 },
    { id: 3, name: "Sliced Bread", price: 4.99, amount: 1 },
    { id: 4, name: "Salad", price: 6.99, amount: 1 },
  ]

  private cart = [];
  private carItemCount = new BehaviorSubject(0);

  constructor() { }

  getProducts() {
    return this.data;
  }


  getCart() {
    return this.cart;
  }


  getCartItemCount() {
    return this.carItemCount;
  }

  addProduct( product ) {
    let added = false;
    for (let p of this.cart) {

      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }

      if(!added){
        this.cart.push(product);
      }

      this.carItemCount.next(this.carItemCount.value + 1);

  }

  decreaseProduct( product ) {
    let added = false;
    for (let [index, p] of this.cart.entries()) {

      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice( index, 1);
        }
      }

      this.carItemCount.next(this.carItemCount.value + 1);

    }

    this.carItemCount.next(this.carItemCount.value - 1);
  }

  removeProduct( product ) {

    for (let [index, p] of this.cart.entries()) {

      if (p.id === product.id) {
        this.carItemCount.next(this.carItemCount.value + 1);
        this.cart.splice( index, 1);
      }

    }

  }

  resetCart(){

    this.cart = [];
    this.carItemCount.next(0);

  }

}

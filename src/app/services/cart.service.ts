import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: any[] = [];
  customerName: string = '';
  tableNumber: number | null = null;
  availableTable: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];

  addToCart(product: any): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }
  } 
  //O método addToCart(product: any) é responsável por adicionar o produto ao carrinho. Ele verifica se o produto já existe no carrinho. Se sim, incrementa a quantidade. Caso contrário, adiciona o produto com quantidade 1.

  getCartItems(): any[] {
    return this.cartItems;
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  }
}

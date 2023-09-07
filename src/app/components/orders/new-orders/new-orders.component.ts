import { ProductsService } from './../../../services/products/products.service';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent implements OnInit {
  products: any[] = [];
  selectedType: string | null = null;
  selectedButtonType: string | null = null;

  constructor(private productsService: ProductsService, private orderService: OrderService) { }

  ngOnInit(): void {
  }

  getProductsByType(type: string): void {
    this.productsService.getProducts().subscribe(
      (data: any) => {
        this.products = data.filter((product: any) => product.type === type);
      },
      (error: any) => {
        console.error('Erro ao buscar produtos', error);
      }
    );
  }

  onSelectType(type: string): void {
    this.selectedType = type;
    this.selectedButtonType = type;
    this.getProductsByType(type);
  }

  addToCart(product: any): void {
    this.orderService.addToCart(product); //esse método é chamado quando clicamos no botão de adicionar produto
  }
}


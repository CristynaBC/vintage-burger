import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.css']
})
export class NewOrdersComponent implements OnInit {
  products: any[] = []; //array que armazenará a lista de produtos obtidos do serviço
  selectedType: string | null = null;
  cartItems: any[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    // Lógica de inicialização do componente
  }

  getProductsByType(type: string): void {
    this.orderService.getProductsByType(type)
      .subscribe(
        (data:any) => {
          // console.log(data)
          // Filtra apenas os produtos do tipo selecionado:
           this.products = data.filter((product: any) => product.type === type);
          
        },
        (error:any) => {
          console.error('Erro ao buscar produtos', error);
        }
      );
  }

  onSelectType(type: string): void {
    this.selectedType = type;
    this.getProductsByType(type);
  }

  addToCart(product: any): void {
    this.cartItems.push(product);
  }
}
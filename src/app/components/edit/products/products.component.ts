import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: any[] = [];
  searchText: string = ''; // Inicializando a variável de pesquisa vazia
  isModalVisible: boolean = false; // Variável para controlar a visibilidade do modal
  currentEditingProduct: any = null; // Produto atualmente em edição

  constructor(private readonly productService: ProductsService) {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        console.log(data);
        this.products = data;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  // Função para filtrar os produtos com base no texto de pesquisa
  get filteredProducts(): any[] {
    const searchTerm = this.searchText.toLowerCase().trim();

    return this.products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.type.toLowerCase().includes(searchTerm)
      );
    });
  }

  // Função para abrir o modal e definir o produto em edição
  openEditModal(product: any) {
    this.currentEditingProduct = product;
    this.isModalVisible = true;
  }

  // Função para fechar o modal
  closeEditModal() {
    this.isModalVisible = false;
  }

  editProduct(product: any) {
    product.price += 0.5;
    this.productService.editProduct(product).subscribe({
      next: (data: any) => {
        console.log(data);
        this.products = [];
        this.loadProducts();
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.products = [];
        this.loadProducts();
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}

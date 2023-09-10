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
    this.currentEditingProduct = { name: '', type: '', price: 0 }; // Inicializa com valores padrão
    // console.log(this.currentEditingProduct)
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

  get filteredProducts(): any[] {
    const searchTerm = this.searchText.toLowerCase().trim();

    return this.products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.type.toLowerCase().includes(searchTerm)
      );
    });
  }

  openEditModal(product: any) {
    this.currentEditingProduct = { ...product }; 
    this.isModalVisible = true;
  }
  
 // Função para fechar o modal
 closeEditModal() {
  this.isModalVisible = false;
}

  editProduct() {
    this.productService.editProduct(this.currentEditingProduct).subscribe({
      next: (data: any) => {
        console.log('Produto editado com sucesso!', data);
        this.loadProducts();
        this.isModalVisible = false; // Feche o modal
      },
      error: (error: any) => {
        console.error('Erro ao editar o produto:', error);
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

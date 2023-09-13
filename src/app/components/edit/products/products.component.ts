import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  role: string | null = null;
  products: any[] = [];
  searchText: string = ''; // Inicializando a variável de pesquisa vazia
  isModalVisible: boolean = false; // Variável para controlar a visibilidade do modal
  currentEditingProduct: any = null; // Produto atualmente em edição
  isEditAlertVisible: boolean = false;
  isDeleteModalVisible: boolean = false;
  isDeleteAlertVisible: boolean = false;

  constructor(
    private authService: AuthService,
    private readonly productService: ProductsService
  ) {
    this.currentEditingProduct = { name: '', type: '', price: 0 }; // Inicializa com valores padrão
    // console.log(this.currentEditingProduct)
    this.loadProducts();
  }

  ngOnInit(): void {
    this.role = this.authService.getRole();
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
        this.isModalVisible = false; // Fecha o modal
        this.showEditAlert(); //mostra o modal de alerta
      },
      error: (error: any) => {
        console.error('Erro ao editar o produto:', error);
      },
    });
  }
  // Função para mostrar o modal de alerta
  showEditAlert() {
    this.isEditAlertVisible = true;
  }

  // Função para fechar o modal de alerta
  closeEditAlert() {
    this.isEditAlertVisible = false;
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.products = [];
        this.loadProducts();
        this.isDeleteModalVisible = false;
        this.showDeleteAlert();
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  // Função para mostrar o modal de exclusão
  showDeleteModal(product: any) {
    this.currentEditingProduct = product;
    this.isDeleteModalVisible = true;
  }

  // Função para fechar o modal de exclusão
  closeDeleteModal() {
    this.isDeleteModalVisible = false;
  }
  // Função para mostrar o modal de confirmação de exclusão
  showDeleteAlert() {
    this.isDeleteAlertVisible = true;
  }

  // Função para fechar o modal de confirmação de exclusão
  closeDeleteAlert() {
    this.isDeleteAlertVisible = false;
  }
}

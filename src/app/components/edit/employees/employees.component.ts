import { Component } from '@angular/core';
import { EmployeesService } from 'src/app/services/employees/employees.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  role: string | null = null;
  users: any[] = [];
  searchText: string = ''; // Inicializando a variável de pesquisa vazia
  isModalVisible: boolean = false; // Variável para controlar a visibilidade do modal
  currentEditingUser: any = null;
  isEditAlertVisible: boolean = false;
  isDeleteModalVisible: boolean = false;
  isDeleteAlertVisible: boolean = false;
  newUser: any = { name: '', email: '', role: '' };
  isCreateModalVisible:boolean = false;
  isCreateAlertVisible:boolean = false;

  constructor(private readonly EmployeeService: EmployeesService, private authService: AuthService, private router: Router) {
    this.currentEditingUser = { name: '', email: '', role: " " }; // Inicializa com valores padrão
    this.loadUsers();
  }

  ngOnInit(): void {
    this.role = this.authService.getRole();
  }

  loadUsers() {
    this.EmployeeService.getUsers().subscribe({
      next: (data: any) => {
        this.users = data;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  get filteredUsers(): any[] {
    const searchTerm = this.searchText.toLowerCase().trim();

    return this.users.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchTerm) ||
        user.role.toLowerCase().includes(searchTerm)
      );
    });
  }

  openEditModal(user: any) {
    this.currentEditingUser = { ...user };
    this.isModalVisible = true;
  }

  // Função para fechar o modal
  closeEditModal() {
    this.isModalVisible = false;
  }

  editUser() {
    this.EmployeeService.editUser(this.currentEditingUser).subscribe({
      next: (data: any) => {
        console.log('funcionário editado com sucesso!', data);
        this.loadUsers();
        this.isModalVisible = false; // Fecha o modal
        this.showEditAlert();
      },
      error: (error: any) => {
        console.error('Erro ao editar o funcionário:', error);
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

  deleteUser(userId: number) {
    this.EmployeeService.deleteUser(userId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.users = [];
        this.loadUsers();
        this.isDeleteModalVisible = false;
        this.showDeleteAlert();
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  // Função para mostrar o modal de exclusão
  showDeleteModal(user: any) {
    this.currentEditingUser = user;
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

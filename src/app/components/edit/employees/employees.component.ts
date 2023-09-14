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
  currentEditingUser: any = null; // Produto atualmente em edição
  isEditAlertVisible: boolean = false;
  isDeleteModalVisible: boolean = false;
  isDeleteAlertVisible: boolean = false;
  newUser: any = { name: '', email: '', role: '' };
  isCreateModalVisible:boolean = false;
  isCreateAlertVisible:boolean = false;

  constructor(private readonly EmployeeService: EmployeesService, private authService: AuthService, private router: Router) {
    this.currentEditingUser = { name: '', email: '', role: 0 }; // Inicializa com valores padrão
    this.loadUsers();
  }

  ngOnInit(): void {
    this.role = this.authService.getRole();
  }

  loadUsers() {
    this.EmployeeService.getUsers().subscribe({
      next: (data: any) => {
        console.log(data);
        this.users = data;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}

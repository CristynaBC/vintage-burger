import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-kitchen-ready',
  templateUrl: './kitchen-ready.component.html',
  styleUrls: ['./kitchen-ready.component.css']
})
export class KitchenReadyComponent {
  role: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();

 }
}

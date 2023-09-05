import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-kitchen-current',
  templateUrl: './kitchen-current.component.html',
  styleUrls: ['./kitchen-current.component.css']
})
export class KitchenCurrentComponent {
  role: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();

 }
}

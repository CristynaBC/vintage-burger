import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormLoginComponent } from './form-login.component';

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormLoginComponent]
    });
    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

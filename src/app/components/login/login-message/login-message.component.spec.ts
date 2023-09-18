import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMessageComponent } from './login-message.component';

describe('LoginMessageComponent', () => {
  let component: LoginMessageComponent;
  let fixture: ComponentFixture<LoginMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginMessageComponent]
    });
    fixture = TestBed.createComponent(LoginMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrdersComponent } from './new-orders.component';

describe('NewOrdersComponent', () => {
  let component: NewOrdersComponent;
  let fixture: ComponentFixture<NewOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewOrdersComponent]
    });
    fixture = TestBed.createComponent(NewOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

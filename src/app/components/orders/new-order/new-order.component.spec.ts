import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderComponent } from './new-order.component';

describe('NewOrderComponent', () => {
  let component: NewOrderComponent;
  let fixture: ComponentFixture<NewOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewOrderComponent]
    });
    fixture = TestBed.createComponent(NewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

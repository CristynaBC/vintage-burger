import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenReadyComponent } from './kitchen-ready.component';

describe('KitchenReadyComponent', () => {
  let component: KitchenReadyComponent;
  let fixture: ComponentFixture<KitchenReadyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KitchenReadyComponent]
    });
    fixture = TestBed.createComponent(KitchenReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

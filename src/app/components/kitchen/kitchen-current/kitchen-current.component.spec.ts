import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenCurrentComponent } from './kitchen-current.component';

describe('KitchenCurrentComponent', () => {
  let component: KitchenCurrentComponent;
  let fixture: ComponentFixture<KitchenCurrentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KitchenCurrentComponent]
    });
    fixture = TestBed.createComponent(KitchenCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

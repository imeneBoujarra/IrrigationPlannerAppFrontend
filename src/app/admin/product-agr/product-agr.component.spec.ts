import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAgrComponent } from './product-agr.component';

describe('ProductAgrComponent', () => {
  let component: ProductAgrComponent;
  let fixture: ComponentFixture<ProductAgrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAgrComponent]
    });
    fixture = TestBed.createComponent(ProductAgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

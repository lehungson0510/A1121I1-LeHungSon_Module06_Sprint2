import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleSpecialComponent } from './sale-special.component';

describe('SaleSpecialComponent', () => {
  let component: SaleSpecialComponent;
  let fixture: ComponentFixture<SaleSpecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleSpecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleSpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

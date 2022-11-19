import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBestSellComponent } from './book-best-sell.component';

describe('BookBestSellComponent', () => {
  let component: BookBestSellComponent;
  let fixture: ComponentFixture<BookBestSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookBestSellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookBestSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCardsComponent } from './seller-cards.component';

describe('SellerCardsComponent', () => {
  let component: SellerCardsComponent;
  let fixture: ComponentFixture<SellerCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellerCardsComponent]
    });
    fixture = TestBed.createComponent(SellerCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

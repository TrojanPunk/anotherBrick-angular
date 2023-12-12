import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCardsComponent } from './show-cards.component';

describe('ShowCardsComponent', () => {
  let component: ShowCardsComponent;
  let fixture: ComponentFixture<ShowCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCardsComponent]
    });
    fixture = TestBed.createComponent(ShowCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

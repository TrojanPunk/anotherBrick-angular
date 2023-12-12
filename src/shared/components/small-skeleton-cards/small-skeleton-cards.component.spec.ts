import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallSkeletonCardsComponent } from './small-skeleton-cards.component';

describe('SmallSkeletonCardsComponent', () => {
  let component: SmallSkeletonCardsComponent;
  let fixture: ComponentFixture<SmallSkeletonCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmallSkeletonCardsComponent]
    });
    fixture = TestBed.createComponent(SmallSkeletonCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeelingLuckyDialogComponent } from './feeling-lucky-dialog.component';

describe('FeelingLuckyDialogComponent', () => {
  let component: FeelingLuckyDialogComponent;
  let fixture: ComponentFixture<FeelingLuckyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeelingLuckyDialogComponent]
    });
    fixture = TestBed.createComponent(FeelingLuckyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

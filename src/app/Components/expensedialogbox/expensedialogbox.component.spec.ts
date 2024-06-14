import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensedialogboxComponent } from './expensedialogbox.component';

describe('ExpensedialogboxComponent', () => {
  let component: ExpensedialogboxComponent;
  let fixture: ComponentFixture<ExpensedialogboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpensedialogboxComponent]
    });
    fixture = TestBed.createComponent(ExpensedialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

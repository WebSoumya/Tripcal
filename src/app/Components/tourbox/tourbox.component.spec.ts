import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourboxComponent } from './tourbox.component';

describe('TourboxComponent', () => {
  let component: TourboxComponent;
  let fixture: ComponentFixture<TourboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourboxComponent]
    });
    fixture = TestBed.createComponent(TourboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AssociateDashboardComponent} from './associate-dashboard.component';

describe('AssociateDashboardComponent', () => {
  let component: AssociateDashboardComponent;
  let fixture: ComponentFixture<AssociateDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssociateDashboardComponent]
    });
    fixture = TestBed.createComponent(AssociateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

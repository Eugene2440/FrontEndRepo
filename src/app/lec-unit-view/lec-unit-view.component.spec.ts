import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecUnitViewComponent } from './lec-unit-view.component';

describe('LecUnitViewComponent', () => {
  let component: LecUnitViewComponent;
  let fixture: ComponentFixture<LecUnitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecUnitViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LecUnitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

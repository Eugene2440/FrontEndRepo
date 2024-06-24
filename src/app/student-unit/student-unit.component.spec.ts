import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUnitComponent } from './student-unit.component';

describe('StudentUnitComponent', () => {
  let component: StudentUnitComponent;
  let fixture: ComponentFixture<StudentUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLecComponent } from './delete-lec.component';

describe('DeleteLecComponent', () => {
  let component: DeleteLecComponent;
  let fixture: ComponentFixture<DeleteLecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteLecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteLecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

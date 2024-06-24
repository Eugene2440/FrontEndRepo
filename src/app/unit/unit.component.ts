import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Week } from '../week';
import { LecturerService } from '../lecturer.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Unit } from '../admin/unit';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [SidebarComponent, CommonModule,ReactiveFormsModule],
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.styles.css']
})
export class UnitComponent {
  unitId!: number;
  weeks: Week[] = [];
  topicForm!: FormGroup;
  selectedFile!: File | null;
  teachingUnits: Unit[] = [];


  constructor(private route: ActivatedRoute, private router:Router, private lecturerService: LecturerService,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.unitId = +this.route.snapshot.paramMap.get('unitId')!;
    this.getWeeks(this.unitId);
    this.initForm();
  }

 
  getWeeks(unitId: number): void {
    this.lecturerService.getWeeks(unitId).subscribe(weeks => {
      this.weeks = weeks;
    });
  }
  initForm(): void {
    this.topicForm = this.fb.group({
      topicName: ['', Validators.required],
      link: ['', Validators.required],
      file: [] // Add a hidden form control for the file
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
    }
  }
  
  
  addTopic(weekId: number): void {
    if (this.topicForm.valid) {
      const formData = new FormData();
      formData.append('weekId', weekId.toString());
      formData.append('topicName', this.topicForm.get('topicName')!.value);
      formData.append('file', this.selectedFile as Blob);
      formData.append('link', this.topicForm.get('link')!.value);
  
      this.lecturerService.addTopic(formData).subscribe(response => {
        // Handle response, update UI, etc.
        this.getWeeks(this.unitId); // Refresh the weeks data
      });
    }
  }
 
 

  viewUnitDetails(unitId: number): void {
    this.router.navigate(['Unit', unitId]); // Navigate to 'unit' route with unitId parameter
  }

}
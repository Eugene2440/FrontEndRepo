import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { Week } from '../week';
import { Unit } from '../admin/unit';
import { HttpClient } from '@angular/common/http';
import { LecturerService } from '../lecturer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lec-unit-view',
  standalone: true,
  imports: [SidebarComponent,CommonModule],
  templateUrl: './lec-unit-view.component.html',
  styleUrl: './lec-unit-view.component.css'
})
export class LecUnitViewComponent  implements OnInit {
  unitId!: number;
  weeks: Week[] = [];
  teachingUnits: Unit[] = [];
  topic: any;

constructor(private lecturerService:LecturerService, private route:ActivatedRoute ) { }

 ngOnInit(): void {
    this.unitId = +this.route.snapshot.paramMap.get('unitId')!;
    console.log('Unit ID:', this.unitId); // Add this line
    this.getWeeks(this.unitId);
  }

  getWeeks(unitId: number): void {
    this.lecturerService.getWeeks(unitId).subscribe(weeks => {
      this.weeks = weeks;
      console.log('Retrieved weeks:', weeks);
    });
  }

  downloadFile() {
    // Example method to trigger file download
    const blob = new Blob([this.base64toBlob(this.topic.fileData)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'filename.ext'; // Set your desired filename and extension
    link.click();
  }

  private base64toBlob(base64Data: string) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([new Uint8Array(byteNumbers)]);
  }
}


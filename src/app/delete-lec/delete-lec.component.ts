import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Lecs } from '../admin/lecs';
@Component({
  selector: 'app-delete-lec',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './delete-lec.component.html',
  styleUrl: './delete-lec.component.css'
})
export class DeleteLecComponent {
  constructor(public dialogRef: MatDialogRef<DeleteLecComponent>, @Inject(MAT_DIALOG_DATA) public data:  { lecturer: Lecs }) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}

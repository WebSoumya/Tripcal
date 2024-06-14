import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  firstName: string;
  lastName: string;
 }
@Component({
  selector: 'app-expensedialogbox',
  templateUrl: './expensedialogbox.component.html',
  styleUrls: ['./expensedialogbox.component.css']
})
export class ExpensedialogboxComponent {
  firstName: string = '';
  lastName: string = '';
 
  constructor(
  public dialogRef: MatDialogRef<ExpensedialogboxComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
 
  onNoClick(): void {
  this.dialogRef.close();
  }
}

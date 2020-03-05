import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.scss']
})
export class ConfirmationDialogComponent {
  public title: string;
  public onlyOk: boolean;
  public error: boolean;
  public warning: boolean;
  public question: boolean;
  public check: boolean;
  public focus: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {
    const data: { title: string } = JSON.parse(message);
    this.title = data.title;
    this.onlyOk = data['onlyOk'] != null ? true : false;
    this.error = data['error'] != null ? true : false;
    this.warning = data['warning'] != null ? true : false;
    this.question = data['question'] != null ? true : false;
    this.check = data['check'] != null ? true : false;
    this.focus = data['focus'] != null ? data['focus'] : 'yes';
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}

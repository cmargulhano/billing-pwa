import { Component, Inject } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'bottom-sheet.component',
  templateUrl: 'bottom-sheet.component.html',
  styleUrls: ['bottom-sheet.component.scss']
})
export class BottomSheetComponent {
  public text: string;
  public labelButtonConfirm: string;
  public labelButtonCancel: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {
    this.text = data['text'];
    this.labelButtonConfirm = data['labelButtonConfirm'];
    this.labelButtonCancel = data['labelButtonCancel'];
  }

  public confirm(event: MouseEvent) {
    this.bottomSheetRef.dismiss(true);
    event.preventDefault();
  }

  public cancel(event: MouseEvent) {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'snack-bar-component',
  templateUrl: './snack-bar-component.html',
  styleUrls: ['./snack-bar-component.scss']
})
export class SnackBarComponent {
  public text: string;
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this.text = data['text'];
  }

}

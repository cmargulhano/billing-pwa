import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpinnerOverlayService } from '../spinner-overlay.service';
import { SpinnerModule } from '../spinner.module';
import { SpinnerOverlayComponent } from './spinner-overlay.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, SpinnerModule, TranslateModule],
  declarations: [SpinnerOverlayComponent],
  entryComponents: [SpinnerOverlayComponent],
  providers: [SpinnerOverlayService],
  exports: []
})
export class SpinnerOverlayModule {}

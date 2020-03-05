import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerOverlayComponent } from './overlay/spinner-overlay.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snackbar/snackbar.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayService {
  public isRunning: boolean = false;
  private overlayRef: OverlayRef = null;

  constructor(
    private overlay: Overlay,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  public show(message = '') {
    // Returns an OverlayRef (which is a PortalHost)
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(SpinnerOverlayComponent);

    // run in async context for triggering "tick", thus avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      const component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
      this.isRunning = true;
      // TODO: set message
      // component.instance.message = message;
    }, 100);
  }

  public hide(message: string = null) {
    setTimeout(() => {
      this.showMsg(message);
      if (!!this.overlayRef) {
        this.overlayRef.detach();
      }
      this.isRunning = false;
    }, 100);
  }

  public showMsg(msgKey: string) {
    if (msgKey) {
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: { text: this.translate.instant(msgKey) },
        duration: 3000
      });
    }
  }
}

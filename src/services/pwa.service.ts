import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/utils/dialog/confirm-dialog';

@Injectable()
export class PwaService {
  private promptEvent: any;
  public subject$ = new Subject<boolean>();

  constructor(
    private swUpdate: SwUpdate,
    private translate: TranslateService,
    private dialog: MatDialog
  ) {
    window.addEventListener('beforeinstallprompt', event => {
      console.log('event');
      console.log(event);
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      this.promptEvent = event;
      this.subject$.next(true);
    });
  }

  public askUserToUpdate() {
    this.swUpdate.available.subscribe(event => {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: JSON.stringify({
          title: this.translate.instant('PWA.MSG.RELOAD'),
          question: true
        }),
        disableClose : true
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          window.location.reload();
        }
      });
    });
  }

  public askUserToInstall() {
    if (this.promptEvent) {
      this.promptEvent.prompt();
      this.promptEvent.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.promptEvent = null;
      });
    }
  }

  public getPromptEvent(): Observable<boolean> {
    return this.subject$.asObservable();
  }
}

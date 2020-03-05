import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PwaService } from 'src/services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(
    private translate: TranslateService,
    private pwaService: PwaService
  ) {
    this.translate.setDefaultLang('pt-BR');
    this.translate.use('pt-BR');
  }

  public ngOnInit() {
    this.pwaService.askUserToUpdate();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}

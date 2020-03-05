import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output()
  public sidenavClose = new EventEmitter();

  constructor(private router: Router) {}

  public ngOnInit() {}

  public onSidenavClose = () => {
    this.closeSidenav();
  };

  public open(menu: string) {
    this.closeSidenav();
    this.router.navigate([menu]);
  }

  private closeSidenav() {
    this.sidenavClose.emit();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-sidenavmenu',
  templateUrl: './sidenavmenu.component.html',
  styleUrls: ['./sidenavmenu.component.css']
})
export class SidenavmenuComponent implements OnInit {
 

  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  routes : any[]=[];
  constructor( private secutiryService: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
    this.routes.push({label:'Home',path:'/home'});
    this.routes.push({label:'Books',path:'/books'});
    this.routes.push({label:'Sincronizar',path:'/sync'});
  }
  LogOut() {
    this.secutiryService.LogOff();
    this.router.navigate(['/']);
  }

}

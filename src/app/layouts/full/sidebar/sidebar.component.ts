import { Component, OnInit } from '@angular/core';
import { navItems } from './Admin-sidebar-data';
import { navItemsFarmer } from './Farmer-sidebar-data';
import { NavService } from '../../../services/nav.service';
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;

  constructor(public navService: NavService, private authService: AuthService) { }

  async ngOnInit() {
   // let resultaapi = await this.authService.isAdmin();
   // console.log("result api", resultaapi)
    let localStoreg = localStorage.getItem('role')
    if (localStoreg && localStoreg !== 'admin') {
      console.log(localStoreg)

      this.navItems = navItemsFarmer;

    }
    //console.log(isadmin);
    console.log("user conencted", this.authService.userConnected);

    /* if (!isadmin) {
       this.navItems = navItemsFarmer
     }
 */
  }
}

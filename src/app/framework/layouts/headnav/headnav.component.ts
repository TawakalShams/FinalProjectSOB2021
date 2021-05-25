import { Component, OnInit } from '@angular/core';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServiceService } from 'src/app/service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headnav',
  templateUrl: './headnav.component.html',
  styleUrls: ['./headnav.component.css']
})
export class HeadnavComponent implements OnInit {
  panelOpenState = false;
  fullName?: string;
  role?: string;
  email?: string;
  
  constructor(private helper: JwtHelperService,private service: ServiceService,private router: Router) {
        const token = localStorage.getItem('token');
        const decodedToken: DecodedToken = helper.decodeToken(token as string);
        this.fullName = decodedToken.fullName;
        this.role = decodedToken.role;
        this.email = decodedToken.email;
   }

  ngOnInit(): void {
  }

  
  isMenuOpen = true;
  contentMargin = 240;

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;

    if(!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }

  ngOnDestroy(){
  }
  get isLoggedIn() { return this.service.isLoggedIn(); }

  logout(){
   const log  = this.service.logout();
          const redirect = this.service.redirectUrl ? this.service.redirectUrl : '/login';
          this.router.navigate([redirect]);

  }
}

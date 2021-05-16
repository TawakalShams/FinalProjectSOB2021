import { Component, OnInit } from '@angular/core';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { JwtHelperService } from '@auth0/angular-jwt';

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
  constructor(private helper: JwtHelperService) {
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
}

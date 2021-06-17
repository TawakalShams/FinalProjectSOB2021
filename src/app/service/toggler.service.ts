import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TogglerService {
  toggled = false;
  sideBarToggle: any = {
    sales: false,
  };
  toggle(): void {
    this.toggled ? (this.toggled = false) : (this.toggled = true);
  }

  sideToggle(menu: any): void {
    this.sideBarToggle[menu]
      ? (this.sideBarToggle[menu] = false)
      : (this.sideBarToggle[menu] = true);
  }
}

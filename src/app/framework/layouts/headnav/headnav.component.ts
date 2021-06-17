import { Component, OnInit, ViewChild } from '@angular/core';
import { DecodedToken } from 'src/app/module/ims/ims.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServiceService } from 'src/app/service/service.service';
import { Router } from '@angular/router';
import { TogglerService } from 'src/app/service/toggler.service';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Agent',
    children: [{ name: 'Regstration' }, { name: 'View' }],
  },
  {
    name: 'Vehicle',
    children: [{ name: 'Regstration' }, { name: 'View' }],
  },
];
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-headnav',
  templateUrl: './headnav.component.html',
  styleUrls: ['./headnav.component.css'],
})
export class HeadnavComponent implements OnInit {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  panelOpenState = false;
  fullName?: string;
  role?: string;
  email?: string;

  constructor(
    private helper: JwtHelperService,
    private service: ServiceService,
    private router: Router,
    public toggler: TogglerService
  ) {
    const token = localStorage.getItem('token');
    const decodedToken: DecodedToken = helper.decodeToken(token as string);
    this.fullName = decodedToken.fullName;
    this.role = decodedToken.role;
    this.email = decodedToken.email;
    this.dataSource.data = TREE_DATA;
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit(): void {}

  isMenuOpen = true;
  contentMargin = 240;

  onToolbarMenuToggle() {
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }

  ngOnDestroy() {}

  get isLoggedIn() {
    return this.service.isLoggedIn();
  }

  logout() {
    const log = this.service.logout();
    const redirect = this.service.redirectUrl
      ? this.service.redirectUrl
      : '/login';
    this.router.navigate([redirect]);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { MenuService } from '../core/services/menu.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService, public menuService: MenuService) { }

  treeNodes = [];

  searchText = ''

  public thyIcons = { expand: 'angle-down', collapse: 'angle-right' };

  ngOnInit(): void {
    this.authService.user().subscribe(data => {
      console.log(data, 131)
    })
    this.menuService.menu().subscribe(data => {
      if (data) {
        this.treeNodes = data.menu
      }
    })

  }

  onClickTitle(node) {
    if (node.link) {
      this.router.navigateByUrl(node.link)
    }
  }

}
